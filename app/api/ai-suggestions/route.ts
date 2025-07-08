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
  try {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    if (!token?.sub || !token.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { todos, context }: { todos: Todo[]; context?: string } = await request.json();
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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    let cleanedText = text;
    if (cleanedText.startsWith("```json")) cleanedText = cleanedText.slice(7, -3).trim();
    else if (cleanedText.startsWith("```")) cleanedText = cleanedText.slice(3, -3).trim();

    const jsonStart = cleanedText.indexOf("[");
    const jsonEnd = cleanedText.lastIndexOf("]");
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No valid JSON array found in the AI response.");
    }

    const jsonString = cleanedText.substring(jsonStart, jsonEnd + 1);
    const suggestions = JSON.parse(jsonString);

    return NextResponse.json({ suggestions });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate AI suggestions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
