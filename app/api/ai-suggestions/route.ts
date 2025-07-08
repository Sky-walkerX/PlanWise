import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define a strict interface for Todo
interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  isCompleted: boolean;
  dueDate?: string;
  completedAt?: string;
  createdAt?: string;
  estimatedTime?: number; // in minutes
}

// POST /api/ai/suggestions
export async function POST(request: NextRequest) {
  console.log("\n--- [POST /api/ai/suggestions] Handler Triggered ---");

  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    console.log("Token object returned by getToken:", token);

    if (!token?.sub || !token.email) {
      console.error("Unauthorized: Token missing user ID or email.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Authenticated user: ${token.email}`);

    const { todos, context }: { todos: Todo[]; context?: string } = await request.json();
    console.log("Received todos:", todos.length);
    console.log("User context:", context);

    const incompleteTasks = todos.filter((todo) => !todo.isCompleted);
    const priorityOrder: Record<Todo["priority"], number> = { HIGH: 1, MEDIUM: 2, LOW: 3 };

    incompleteTasks.sort((a, b) => {
      const aOverdue = a.dueDate && new Date(a.dueDate) < new Date();
      const bOverdue = b.dueDate && new Date(b.dueDate) < new Date();

      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;

      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;

      return dateA - dateB;
    });

    const formattedTasks = incompleteTasks
      .map(
        (task) =>
          `- ID: ${task.id}, Title: "${task.title}", Priority: ${task.priority}, Due: ${task.dueDate || "None"}, Estimated Time: ${task.estimatedTime || "Unknown"} min, Description: "${task.description || "None"}"`,
      )
      .join("\n");

    const prompt = `
You are a productivity AI assistant. Given these incomplete tasks:

${formattedTasks}

${context ? `User context: "${context}"` : ""}

Create a JSON object with:
- "reasoning": short explanation (2-4 sentences)
- "plan": ordered array of task IDs (strings)

Use this format:
{
  "reasoning": "...",
  "plan": ["id1", "id2", ...]
}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    console.log("Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Raw AI response text:", text);

    // Clean and parse the AI output
    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) cleanedText = cleanedText.slice(7, -3).trim();
    else if (cleanedText.startsWith("```")) cleanedText = cleanedText.slice(3, -3).trim();

    const jsonStart = cleanedText.indexOf("{");
    const jsonEnd = cleanedText.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No valid JSON object found in the AI response.");
    }

    const jsonString = cleanedText.substring(jsonStart, jsonEnd + 1);
    const suggestions = JSON.parse(jsonString);
    console.log("Parsed AI suggestions:", suggestions);

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Error in POST /api/ai/suggestions:", error);
    return NextResponse.json(
      {
        error: "Failed to generate AI suggestions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
