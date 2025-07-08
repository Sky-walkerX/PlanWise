// Your existing imports
import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  isCompleted: boolean;
  dueDate?: string;
  estimatedTime?: number;
}

export async function POST(request: NextRequest) {
  console.log("--- AI Suggestions POST Handler Triggered ---"); // Start of handler
  try {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    if (!token?.sub || !token.email) {
      console.error("Unauthorized: Token sub or email missing.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("Token validated for user:", token.email);

    // IMPORTANT: Check API key directly before using it
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set in environment variables!");
      throw new Error("GEMINI_API_KEY is not configured.");
    }
    // console.log("GEMINI_API_KEY detected (do not log actual key for security)"); // You can uncomment this just to confirm presence

    const { todos, context }: { todos: Todo[]; context?: string } = await request.json();
    console.log("Request body parsed successfully. Number of todos received:", todos.length);

    const incompleteTasks = todos.filter((todo) => !todo.isCompleted);
    const formattedTasks = incompleteTasks
      .map(
        (task) =>
          `- ID: ${task.id}, Title: "${task.title}", Priority: ${task.priority}, Due: ${task.dueDate || "None"}, Estimated Time: ${task.estimatedTime || "Unknown"} min, Description: "${task.description || "None"}"`,
      )
      .join("\n");

    const prompt = `
You are a productivity AI coach. Given the user's task list, return a JSON array of suggestions. Each suggestion must include:

- id: a unique suggestion ID (you can reuse task ID or create new UUID)
- title: short actionable advice
- description: 1-2 lines expanding on the title
- type: one of [productivity, scheduling, prioritization, habits, focus]
- priority: "high", "medium", or "low"
- reasoning: why this suggestion is valuable
- actionSteps: a list of concrete steps the user should take
- estimatedImpact: 1-sentence expected benefit

User’s tasks:
${formattedTasks}

${context ? `User context: "${context}"` : ""}

Respond with only this array. No explanation or wrapping.
Example:
[
  {
    "id": "abc123",
    "title": "Start your day with your hardest task",
    "description": "Use morning focus to tackle the most demanding task first.",
    "type": "prioritization",
    "priority": "high",
    "reasoning": "Doing the most difficult task early builds momentum and reduces procrastination.",
    "actionSteps": ["Identify your hardest task", "Block 1 hour tomorrow morning", "Do it before checking email"],
    "estimatedImpact": "Improves focus and reduces stress for the rest of the day."
  }
]
    `;
    console.log("Prompt generated. Length:", prompt.length);
    // console.log("Full prompt:\n", prompt); // Uncomment temporarily if you suspect prompt content

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    console.log("Gemini model instance created.");

    // Step where API call is made
    const result = await model.generateContent(prompt);
    console.log("API response result object received.");

    const response = await result.response;
    const text = response.text().trim();
    console.log("Raw AI response text extracted. Length:", text.length);
    // console.log("Raw AI response text:\n", text); // Uncomment temporarily to inspect exact AI output

    // Clean the text
    let cleanedText = text;
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.slice(7, -3).trim();
      console.log("Cleaned text: removed ```json and ```.");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.slice(3, -3).trim();
      console.log("Cleaned text: removed ```.");
    } else {
      console.log("Cleaned text: no ``` markers found.");
    }

    // Extract JSON array from cleaned text
    const jsonStart = cleanedText.indexOf("[");
    const jsonEnd = cleanedText.lastIndexOf("]");
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error("Error: No valid JSON array start/end markers found after cleaning.");
      throw new Error("No valid JSON array found in the AI response.");
    }
    console.log(`JSON markers found: start=${jsonStart}, end=${jsonEnd}.`);

    const jsonString = cleanedText.substring(jsonStart, jsonEnd + 1);
    console.log("Extracted JSON string length:", jsonString.length);
    // console.log("Extracted JSON string:\n", jsonString); // Uncomment temporarily to inspect exact JSON string before parsing

    const suggestions = JSON.parse(jsonString); // This is where the error will likely occur if JSON is malformed
    console.log("JSON parsed successfully. Number of suggestions:", suggestions.length);

    return NextResponse.json({ suggestions });
  } catch (error) {
    // This catch block logs the actual error that caused the 500
    console.error("Error in /api/ai-suggestions POST:", error);
    return NextResponse.json(
      {
        error: "Failed to generate AI suggestions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}