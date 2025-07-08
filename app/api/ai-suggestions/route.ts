import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth"; // Changed from getToken to getServerSession
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define a strict interface for Todo, matching your provided structure
interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  isCompleted: boolean;
  dueDate?: string;
  completedAt?: string;
  createdAt?: string;
  estimatedTime?: number; // in minutes, optional
}

// POST /api/ai/suggestions - Endpoint to generate AI-driven task suggestions/plan
export async function POST(request: NextRequest) {
  console.log("\n--- [POST /api/ai/suggestions] Handler Triggered ---");

  try {
    console.log("Incoming request headers:", request.headers);
    // Note: AUTH_SECRET is used internally by NextAuth.js for getServerSession,
    // but not directly passed as a parameter here like with getToken.
    console.log("Value of process.env.AUTH_SECRET:", process.env.AUTH_SECRET);

    // Get the user session
    const session = await getServerSession();
    console.log("Session object returned by getServerSession:", session);

    // Check if the user is authenticated via session
    if (!session?.user?.email) { // Using session.user.email for authorization
      console.error("Validation failed: Session is null or user email is missing. Responding with 401.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Validation successful. User email from session: ${session.user.email}`);

    // Parse the request body to get tasks and optional context
    const { todos, context }: { todos: Todo[]; context?: string } = await request.json();
    console.log("Received todos for smart plan:", todos);
    console.log("Received context:", context);

    // Filter for incomplete tasks
    const incompleteTasks = todos.filter((todo) => !todo.isCompleted);
    console.log("Incomplete tasks:", incompleteTasks.length);

    // Define priority order for sorting
    const priorityOrder: Record<Todo["priority"], number> = { HIGH: 1, MEDIUM: 2, LOW: 3 };

    // Sort incomplete tasks based on overdue status, priority, and due date
    incompleteTasks.sort((a, b) => {
      const aIsOverdue = a.dueDate && new Date(a.dueDate) < new Date();
      const bIsOverdue = b.dueDate && new Date(b.dueDate) < new Date();

      if (aIsOverdue && !bIsOverdue) return -1; // a is overdue, b is not -> a comes first
      if (!aIsOverdue && bIsOverdue) return 1;  // b is overdue, a is not -> b comes first

      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff; // Sort by priority if overdue status is same

      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity; // Overdue tasks already handled
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB; // Sort by due date if priority is same
    });

    // Format tasks into a string for the AI prompt, including all relevant fields
    const formattedTasks = incompleteTasks
      .map(
        (task: Todo) =>
          `- ID: ${task.id}, Title: "${task.title}", Priority: ${task.priority}, Due: ${task.dueDate || "None"}, Estimated Time: ${task.estimatedTime || "Unknown"} min, Description: "${task.description || "None"}"`,
      )
      .join("\n");

    // Construct the prompt for the AI model
    const prompt = `
You are a highly intelligent productivity AI assistant. Your goal is to analyze a user's task data and provide a well-reasoned, actionable plan for completing their tasks effectively.

Here are the user's current incomplete tasks:
${formattedTasks}

${context ? `Additional context from the user: "${context}"` : ""}

Analyze this list and create a prioritized order to tackle them. Consider these principles:
1. **Eat the Frog:** High-priority and most impactful tasks should be done early when energy and focus are highest.
2. **Momentum Building:** If suitable, suggest starting with a quick, easy task to build initial momentum and a sense of accomplishment.
3. **Task Batching:** Identify and group similar tasks together to minimize context switching and improve efficiency.
4. **Deadlines:** Prioritize tasks with imminent deadlines, especially if they are critical.
5. **Energy Management:** Suggest tackling more demanding tasks during peak energy times and less demanding ones when energy might be lower.
6. **Context Switching:** Minimize switching between vastly different types of work.
7. **Dependencies:** If any tasks implicitly depend on others (e.g., "Research X" before "Write Report on X"), factor this into the order.

Provide your response in a JSON object with two keys:
- "reasoning": A concise (2-4 sentences), clear, and encouraging explanation of the logic behind your suggested order.
- "plan": An array of the task IDs (strings), in the exact order you recommend the user tackle them. Ensure all provided task IDs are included in the plan.

Example Response:
{
  "reasoning": "We'll kick off with a high-impact task to leverage your peak focus, followed by a quick win to maintain momentum. The remaining tasks are then grouped by priority and due date to ensure efficient completion.",
  "plan": ["task-id-1", "task-id-5", "task-id-2", "task-id-4", "task-id-3"]
}
    `;

    // Get the Generative AI model (using gemini-1.5-flash-latest as specified)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    console.log("Sending prompt to AI model...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Raw AI response text:", text);

    try {
      // Robust cleaning logic to extract valid JSON from the AI response
      let cleanedText = text.trim();

      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.slice(7, -3).trim();
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.slice(3, -3).trim();
      }

      const startIndex = cleanedText.indexOf("{");
      const endIndex = cleanedText.lastIndexOf("}");

      if (startIndex === -1 || endIndex === -1) {
        console.error("Error: No valid JSON object found in the AI response. Cleaned text:", cleanedText);
        throw new Error("No valid JSON object found in the AI response.");
      }

      const jsonString = cleanedText.substring(startIndex, endIndex + 1);
      console.log("Extracted JSON string:", jsonString);

      const suggestions = JSON.parse(jsonString);
      console.log("Parsed AI suggestions:", suggestions);

      return NextResponse.json(suggestions);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw AI response text that caused parsing error:", text);
      return NextResponse.json(
        {
          error: "Failed to parse AI response",
          rawResponse: text,
          details: parseError instanceof Error ? parseError.message : "Unknown parsing error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("An unexpected error occurred in POST /api/ai/suggestions (AI Suggestions Error):", error);
    return NextResponse.json(
      {
        error: "Failed to generate suggestions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
