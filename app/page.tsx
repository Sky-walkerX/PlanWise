"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import TodayTasks from "@/app/components/today-tasks"
import PomodoroTimer from "@/app/components/timer"
import SpotifyWidget from "@/app/components/spotify-widget"
import AISuggestionsPanel from "@/app/components/ai-suggestion-panel"
import { useTodos } from "@/hooks/useTodos"

export default function HomePage() {
  const { status } = useSession()
  const router = useRouter()
  const { isLoading: todosLoading } = useTodos()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading" || todosLoading) {
    return (
      <div className="min-h-screen bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-[var(--accent1bg)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">Loading your workspace...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }


  return (
    <div className="min-h-screen bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)]">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-300px)]">
          {/* Today's Tasks with Smart Plan Integration */}
          <div className="lg:row-span-1">
            <TodayTasks />
          </div>

          {/* Pomodoro Timer */}
          <div className="lg:row-span-1">
            <PomodoroTimer />
          </div>

          {/* AI Suggestions Panel */}
          <div className="lg:row-span-1">
            <AISuggestionsPanel />
          </div>

          {/* Spotify Widget */}
          <div className="lg:row-span-1">
            <SpotifyWidget />
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">

          {/* Productivity Tip */}
          <div className="text-center">
            <p className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
              💡 <strong>Pro tip:</strong> Use the AI smart plan feature to optimize your daily task order
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
