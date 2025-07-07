"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { BarChart3, TrendingUp, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { useAnalytics } from "@/hooks/use-analytics"
import StatsCards from "@/app/components/analytics/stats-card"
import ActivityHeatmap from "@/app/components/analytics/heatmap"
import XPBreakdown from "@/app/components/analytics/xp"

export default function AnalyticsPage() {
  const { status } = useSession()
  const router = useRouter()
  const { data: stats, isLoading } = useAnalytics()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-[var(--accent1bg)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated" || !stats) {
    return null
  }

  return (
    <div className="min-h-screen bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--accent1bg)] flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                Analytics Dashboard
              </h1>
              <p className="text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)] text-lg">
                Track your productivity and level up your game
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Activity Heatmap */}
          <ActivityHeatmap />

          {/* Weekly Progress Chart */}
          <Card className="bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border-[var(--secondarybg)]">
            <CardHeader className="pb-4">
              <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--accent1bg)]" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-32">
                {stats.weeklyProgress.map((count, index) => {
                  const maxCount = Math.max(...stats.weeklyProgress)
                  const height = maxCount > 0 ? (count / maxCount) * 100 : 0
                  const days = ["Sun" , "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center h-24">
                        <div
                          className="w-full bg-[var(--accent1bg)] rounded-t-sm transition-all duration-300 hover:opacity-80"
                          style={{ height: `${height}%`, minHeight: count > 0 ? "8px" : "2px" }}
                          title={`${days[index]}: ${count} tasks`}
                        />
                      </div>
                      <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">{days[index]}</div>
                      <div className="text-sm font-semibold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                        {count}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* XP Breakdown */}
          <XPBreakdown />

          {/* Achievement Preview */}
          <Card className="bg-gradient-to-r from-[var(--accent1bg)]/10 to-purple-500/10 border-[var(--accent1bg)]/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
                <Award className="w-5 h-5 text-[var(--accent1bg)]" />
                Coming Soon: Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)] opacity-60">
                  <div className="text-2xl mb-2">🏆</div>
                  <h4 className="font-semibold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                    Task Master
                  </h4>
                  <p className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Complete 100 tasks</p>
                </div>

                <div className="p-4 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)] opacity-60">
                  <div className="text-2xl mb-2">🔥</div>
                  <h4 className="font-semibold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                    Streak Legend
                  </h4>
                  <p className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">30-day streak</p>
                </div>

                <div className="p-4 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)] opacity-60">
                  <div className="text-2xl mb-2">⚡</div>
                  <h4 className="font-semibold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                    Speed Demon
                  </h4>
                  <p className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
                    Complete 10 tasks early
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
