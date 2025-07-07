"use client"

import { useState } from "react"
import type { Todo } from "@/app/generated/prisma"

export interface SmartPlan {
  reasoning: string
  plan: string[] // Array of task IDs in optimized order
}

export function useSmartPlan() {
  const [plan, setPlan] = useState<SmartPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSmartPlan = async (tasks: Todo[]) => {
    if (tasks.length === 0) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/smart-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate smart plan")
      }

      const data = await response.json()
      setPlan(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate smart plan")
    } finally {
      setIsLoading(false)
    }
  }

  const applySmartPlan = async () => {
    if (!plan) return

    setIsLoading(true)
    try {
      // Here you could implement actual task reordering in the database
      // For now, we'll just clear the plan to simulate applying it
      console.log("Applying smart plan:", plan.plan)

      // In a real implementation, you might:
      // 1. Update task order in database
      // 2. Refresh the tasks list
      // 3. Show success message
    } catch (err) {
      setError("Failed to apply smart plan")
    } finally {
      setIsLoading(false)
    }
  }

  const clearPlan = () => {
    setPlan(null)
    setError(null)
  }

  return {
    plan,
    isLoading,
    error,
    generateSmartPlan,
    applySmartPlan,
    clearPlan,
  }
}
