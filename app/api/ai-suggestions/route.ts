"use server"

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Define a strict interface for Todo
interface Todo {
  id: string
  title: string
  description?: string
  priority: "LOW" | "MEDIUM" | "HIGH"
  isCompleted: boolean
  dueDate?: string
  completedAt?: string
  createdAt?: string
}



export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { todos }: { todos: Todo[]; context?: string } = await request.json()

    const incompleteTasks = todos.filter((todo) => !todo.isCompleted)

    const priorityOrder: Record<Todo["priority"], number> = { HIGH: 1, MEDIUM: 2, LOW: 3 }
    incompleteTasks.sort((a, b) => {
      const aIsOverdue = a.dueDate && new Date(a.dueDate) < new Date()
      const bIsOverdue = b.dueDate && new Date(b.dueDate) < new Date()

      if (aIsOverdue && !bIsOverdue) return -1
      if (!aIsOverdue && bIsOverdue) return 1

      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
      if (priorityDiff !== 0) return priorityDiff

      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
      return dateA - dateB
    })



    const prompt = `
You are a highly intelligent productivity AI assistant. Your goal is to analyze a user's task data...

// [Prompt content unchanged – keep your full prompt here for brevity]
    `

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    try {
      let cleanedText = text.trim()

      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.slice(7, -3).trim()
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.slice(3, -3).trim()
      }

      const startIndex = cleanedText.indexOf("{")
      const endIndex = cleanedText.lastIndexOf("}")

      if (startIndex === -1 || endIndex === -1) {
        throw new Error("No valid JSON object found in the AI response.")
      }

      const jsonString = cleanedText.substring(startIndex, endIndex + 1)
      const suggestions = JSON.parse(jsonString)

      return NextResponse.json(suggestions)
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      console.error("Raw AI response text:", text)
      return NextResponse.json(
        {
          error: "Failed to parse AI response",
          rawResponse: text,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("AI Suggestions Error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate suggestions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
