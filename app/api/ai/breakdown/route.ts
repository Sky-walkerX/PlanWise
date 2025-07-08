import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// POST /api/ai/breakdown - Endpoint to break down a task using AI
export async function POST(request: NextRequest) {
  console.log("\n--- [POST /api/ai/breakdown] Handler Triggered ---");

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

    // Parse the request body to get taskTitle and taskDescription
    const { taskTitle, taskDescription } = await request.json();
    console.log("Received taskTitle:", taskTitle);
    console.log("Received taskDescription:", taskDescription);

    // Validate taskTitle length
    if (!taskTitle || taskTitle.trim().length < 10) {
      console.error("Validation failed: Task title is too short for breakdown.");
      return NextResponse.json({ error: "Task title is too short for breakdown." }, { status: 400 });
    }

    // Construct the prompt for the AI model
    const prompt = `
    You are an expert project manager AI. Your task is to break down a user's goal into small, actionable, and specific sub-tasks.
    
    User's Goal: "${taskTitle}"
    ${taskDescription ? `Additional Context: "${taskDescription}"` : ""}

    Generate 3 to 5 sub-tasks. Each sub-task should be a clear action that can be completed in one session. Start each with an action verb (e.g., "Research", "Draft", "Design", "Implement", "Schedule").

    Return the result as a JSON object with a single key "subTasks", which is an array of strings. Do not include any other text or markdown formatting.

    Example:
    {
      "subTasks": ["Define campaign target audience", "Draft ad copy variations", "Set up analytics tracking dashboard", "Configure ad campaign budget and schedule"]
    }
    `;

    // Get the Generative AI model and generate content
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    console.log("Sending prompt to AI model...");
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("Raw AI response text:", text);

    // Robust cleaning logic to extract JSON from the AI response
    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.slice(7, -3).trim();
    }
    const jsonStartIndex = cleanedText.indexOf("{");
    const jsonEndIndex = cleanedText.lastIndexOf("}");
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      console.error("Error: Could not find JSON in AI response. Cleaned text:", cleanedText);
      throw new Error("Could not find JSON in AI response.");
    }
    const jsonString = cleanedText.substring(jsonStartIndex, jsonEndIndex + 1);
    console.log("Extracted JSON string:", jsonString);

    // Parse and return the JSON response
    return NextResponse.json(JSON.parse(jsonString));
  } catch (error) {
    console.error("An unexpected error occurred in POST /api/ai/breakdown (AI Breakdown Error):", error);
    return NextResponse.json({ error: "Failed to break down task" }, { status: 500 });
  }
}
