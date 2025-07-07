"use client"

import { useState } from "react"
import { useTodos } from "./useTodos"

export interface AISuggestion {
  id: string
  type: "productivity" | "scheduling" | "prioritization" | "habits" | "focus"
  title: string
  description: string
  reasoning: string
  actionSteps: string[]
  priority: "high" | "medium" | "low"
  estimatedImpact: string
}

export interface AISuggestionsResponse {
  suggestions: AISuggestion[]
}

export function useAISuggestions() {
  const { data: todos = [] } = useTodos()
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSuggestions = async (context?: string) => {
    if (todos.length === 0) {
      setError("No tasks available for analysis")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todos,
          context: context || "General productivity improvement",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate suggestions")
      }

      const data: AISuggestionsResponse = await response.json()
      setSuggestions(data.suggestions || [])
    } catch (err) {
      console.error("Error generating AI suggestions:", err)
      setError(err instanceof Error ? err.message : "Failed to generate suggestions")
    } finally {
      setIsLoading(false)
    }
  }

  const dismissSuggestion = (suggestionId: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId))
  }

  const clearSuggestions = () => {
    setSuggestions([])
    setError(null)
  }

  return {
    suggestions,
    isLoading,
    error,
    generateSuggestions,
    dismissSuggestion,
    clearSuggestions,
  }
}
