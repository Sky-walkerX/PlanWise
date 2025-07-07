import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    if (!token?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { taskTitle, taskDescription } = await request.json()

    if (!taskTitle || taskTitle.trim().length < 10) {
      return NextResponse.json({ error: "Task title is too short for breakdown." }, { status: 400 })
    }

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
  `

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
    const result = await model.generateContent(prompt)
    const text = result.response.text()

    // Use robust cleaning logic
    let cleanedText = text.trim()
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.slice(7, -3).trim()
    }
    const jsonStartIndex = cleanedText.indexOf("{")
    const jsonEndIndex = cleanedText.lastIndexOf("}")
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error("Could not find JSON in AI response.")
    }
    const jsonString = cleanedText.substring(jsonStartIndex, jsonEndIndex + 1)

    return NextResponse.json(JSON.parse(jsonString))
  } catch (error) {
    console.error("AI Breakdown Error:", error)
    return NextResponse.json({ error: "Failed to break down task" }, { status: 500 })
  }
}
