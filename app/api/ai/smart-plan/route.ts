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

    const { tasks } = await request.json()

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({
        reasoning: "No tasks to optimize.",
        plan: [],
      })
    }

    const formattedTasks = tasks
      .map(
        (task: any) =>
          `- ID: ${task.id}, Title: "${task.title}", Priority: ${task.priority}, Due: ${task.dueDate || "None"}, Estimated Time: ${task.estimatedTime || "Unknown"} min, Description: "${task.description || "None"}"`,
      )
      .join("\n")

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
  `

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
    const result = await model.generateContent(prompt)
    const text = result.response.text()

    // Clean the AI response to extract valid JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const cleanedJsonString = jsonMatch ? jsonMatch[0] : '{"reasoning": "Unable to generate plan", "plan": []}'

    return NextResponse.json(JSON.parse(cleanedJsonString))
  } catch (error) {
    console.error("AI Smart Plan Error:", error)
    return NextResponse.json({ error: "Failed to generate smart plan" }, { status: 500 })
  }
}
