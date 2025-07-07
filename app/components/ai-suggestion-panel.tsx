"use client"

import { useState } from "react"
import {
  Sparkles,
  Brain,
  TrendingUp,
  Clock,
  Target,
  Lightbulb,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Textarea } from "@/app/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ui/collapsible"
import { useAISuggestions } from "@/hooks/use-ai-suggestions"

export default function AISuggestionsPanel() {
  const { suggestions, isLoading, error, generateSuggestions, dismissSuggestion, clearSuggestions } = useAISuggestions()

  const [context, setContext] = useState("")
  const [expandedSuggestions, setExpandedSuggestions] = useState<Set<string>>(new Set())

  const handleGenerate = () => {
    generateSuggestions(context.trim() || undefined)
  }

  const toggleExpanded = (suggestionId: string) => {
    const newExpanded = new Set(expandedSuggestions)
    if (newExpanded.has(suggestionId)) {
      newExpanded.delete(suggestionId)
    } else {
      newExpanded.add(suggestionId)
    }
    setExpandedSuggestions(newExpanded)
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "productivity":
        return <TrendingUp className="w-4 h-4" />
      case "scheduling":
        return <Clock className="w-4 h-4" />
      case "prioritization":
        return <Target className="w-4 h-4" />
      case "habits":
        return <CheckCircle2 className="w-4 h-4" />
      case "focus":
        return <Brain className="w-4 h-4" />
      default:
        return <Lightbulb className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "productivity":
        return "bg-blue-100 text-blue-800"
      case "scheduling":
        return "bg-purple-100 text-purple-800"
      case "prioritization":
        return "bg-orange-100 text-orange-800"
      case "habits":
        return "bg-green-100 text-green-800"
      case "focus":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border-[var(--secondarybg)]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent1bg)]" />
            AI Productivity Coach
          </CardTitle>
          {suggestions.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSuggestions}
              className="text-[var(--mutedbg)] hover:text-[var(--accent2bg)]"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Context Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
            What would you like help with? (optional)
          </label>
          <Textarea
            placeholder="e.g., I'm struggling with procrastination, need better time management, want to improve focus..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="border-[var(--secondarybg)] bg-[var(--secondarybg)] text-[var(--accent2bg)] resize-none"
            rows={2}
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing your tasks...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Get AI Suggestions
            </>
          )}
        </Button>

        {/* Error State */}
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Error</span>
            </div>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                Personalized Suggestions
              </h4>
              <Badge variant="secondary" className="bg-[var(--accent1bg)]/10 text-[var(--accent1bg)]">
                {suggestions.length} suggestions
              </Badge>
            </div>

            {suggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className="border-[var(--secondarybg)] dark:border-[var(--secondarybgdark)] bg-[var(--secondarybg)]/30"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-[var(--accent1bg)] mt-0.5">{getSuggestionIcon(suggestion.type)}</div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] mb-1">
                            {suggestion.title}
                          </h5>
                          <p className="text-sm text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] opacity-80 mb-2">
                            {suggestion.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={`${getTypeColor(suggestion.type)} text-xs`}>{suggestion.type}</Badge>
                            <Badge className={`${getPriorityColor(suggestion.priority)} text-xs`}>
                              {suggestion.priority} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissSuggestion(suggestion.id)}
                        className="text-[var(--mutedbg)] hover:text-red-600 p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Expandable Details */}
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(suggestion.id)}
                          className="w-full justify-between text-[var(--accent2bg)] hover:bg-[var(--secondarybg)]"
                        >
                          <span className="text-sm">View details & action steps</span>
                          {expandedSuggestions.has(suggestion.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-3 pt-2">
                        {/* Reasoning */}
                        <div className="p-3 rounded-lg bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border border-[var(--secondarybg)]">
                          <h6 className="text-sm font-medium text-[var(--accent2bg)] mb-1">Why this suggestion?</h6>
                          <p className="text-sm text-[var(--accent2bg)] opacity-80">{suggestion.reasoning}</p>
                        </div>

                        {/* Action Steps */}
                        <div>
                          <h6 className="text-sm font-medium text-[var(--accent2bg)] mb-2">Action Steps:</h6>
                          <ol className="space-y-1">
                            {suggestion.actionSteps.map((step, index) => (
                              <li key={index} className="text-sm text-[var(--accent2bg)] opacity-80 flex gap-2">
                                <span className="text-[var(--accent1bg)] font-medium min-w-[1.5rem]">{index + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Expected Impact */}
                        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                          <h6 className="text-sm font-medium text-green-800 mb-1">Expected Impact:</h6>
                          <p className="text-sm text-green-700">{suggestion.estimatedImpact}</p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {suggestions.length === 0 && !isLoading && !error && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)] flex items-center justify-center">
              <Brain className="w-6 h-6 text-[var(--accent1bg)]" />
            </div>
            <p className="text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)] text-sm mb-3">
              Get personalized productivity insights based on your task patterns
            </p>
            <p className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
              AI will analyze your completed and pending tasks to provide tailored suggestions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
