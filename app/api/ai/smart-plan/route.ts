import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define the Task interface for type safety
interface Task {
  id: string;
  title: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
  estimatedTime?: number; // in minutes
  description?: string;
}

// POST /api/ai/smart-plan - Endpoint to generate a smart plan for tasks using AI
export async function POST(request: NextRequest) {
  console.log("\n--- [POST /api/ai/smart-plan] Handler Triggered ---");

  try {
    console.log("Incoming request headers:", request.headers);
    console.log("Value of process.env.AUTH_SECRET:", process.env.AUTH_SECRET);

    // Get the JWT token from the request, explicitly providing the secret
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET, // Ensure the secret is explicitly provided
    });

    console.log("Token object returned by getToken:", token);

    // Check if the token exists and has a 'sub' (subject/user ID)
    if (!token?.sub) { // Changed from token?.id to token?.sub for consistency
      console.error("Validation failed: Token is null or missing `sub`. Responding with 401.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Validation successful. User ID from token: ${token.sub}`);

    // Parse the request body to get the array of tasks
    const { tasks } = await request.json();
    console.log("Received tasks for smart plan:", tasks);

    // Validate if tasks array is provided and not empty
    if (!tasks || tasks.length === 0) {
      console.log("No tasks provided for optimization. Returning empty plan.");
      return NextResponse.json({
        reasoning: "No tasks to optimize.",
        plan: [],
      });
    }

    // Format tasks into a string for the AI prompt
    const formattedTasks = tasks
      .map(
        (task: Task) =>
          `- ID: ${task.id}, Title: "${task.title}", Priority: ${task.priority}, Due: ${task.dueDate || "None"}, Estimated Time: ${task.estimatedTime || "Unknown"} min, Description: "${task.description || "None"}"`,
      )
      .join("\n");

    // Construct the prompt for the AI model
    const prompt = `
    You are a world-class productivity coach AI. Your goal is to create the most effective order for completing today's tasks.

    Here are the user's tasks for today:
    ${formattedTasks}

    Analyze this list and create a prioritized order to tackle them. Consider these principles:
    1. **Eat the Frog:** High-priority tasks should be done early when energy is high.
    2. **Momentum:** Start with a quick, easy task if there's a good candidate, to build momentum.
    3. **Task Batching:** Group similar, small tasks together.
    4. **Deadlines:** Pay attention to any tasks that might have a specific time-sensitive due date today.
    5. **Energy Management:** Consider task complexity and estimated time.
    6. **Context Switching:** Minimize switching between different types of work.

    Provide your response in a JSON object with two keys:
    - "reasoning": A short (2-3 sentences), encouraging paragraph explaining the logic behind your suggested order.
    - "plan": An array of the task IDs, in the exact order you recommend the user tackle them.

    Example Response:
    {
      "reasoning": "Let's start with a quick win to build momentum! After that, we'll tackle your most important task while your focus is at its peak. We can then clear out the remaining items efficiently.",
      "plan": ["id-345", "id-123", "id-678", "id-910"]
    }
    `;

    // Get the Generative AI model and generate content
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    console.log("Sending prompt to AI model...");
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("Raw AI response text:", text);

    // Clean the AI response to extract valid JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const cleanedJsonString = jsonMatch ? jsonMatch[0] : '{"reasoning": "Unable to generate plan", "plan": []}';
    console.log("Extracted JSON string:", cleanedJsonString);

    // Parse and return the JSON response
    return NextResponse.json(JSON.parse(cleanedJsonString));
  } catch (error) {
    console.error("An unexpected error occurred in POST /api/ai/smart-plan (AI Smart Plan Error):", error);
    return NextResponse.json({ error: "Failed to generate smart plan" }, { status: 500 });
  }
}
