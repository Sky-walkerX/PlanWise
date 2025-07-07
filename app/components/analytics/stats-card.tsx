"use client"

import { Trophy, Target, Flame, Zap, CheckCircle, Timer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"
import { Badge } from "@/app/components/ui/badge"
import type { UserStats } from "@/hooks/use-analytics"

interface StatsCardsProps {
  stats: UserStats
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const getLevelBadgeColor = (level: number) => {
    if (level >= 10) return "bg-purple-500 text-white"
    if (level >= 5) return "bg-blue-500 text-white"
    return "bg-green-500 text-white"
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 10) return "text-orange-600"
    if (streak >= 5) return "text-yellow-600"
    return "text-green-600"
  }

  const progressPercentage = ((stats.totalXP - stats.xpForCurrentLevel) / 100) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Level & XP Card */}
      <Card className="bg-gradient-to-br from-[var(--accent1bg)]/10 to-[var(--accent1bg)]/5 border-[var(--accent1bg)]/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[var(--accent1bg)]" />
            Level & Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                {stats.totalXP}
              </div>
              <div className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Total XP</div>
            </div>
            <Badge className={`${getLevelBadgeColor(stats.level)} px-3 py-1`}>Level {stats.level}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
                Progress to Level {stats.level + 1}
              </span>
              <span className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] font-medium">
                {stats.xpToNextLevel} XP needed
              </span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-2 bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Streak Card */}
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border-orange-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Streak Power
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-3xl font-bold ${getStreakColor(stats.currentStreak)}`}>{stats.currentStreak}</div>
              <div className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Current Streak</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                {stats.longestStreak}
              </div>
              <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Best Streak</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
              {stats.currentStreak >= 10
                ? "+10 XP bonus!"
                : stats.currentStreak >= 5
                  ? "+5 XP bonus!"
                  : stats.currentStreak > 0
                    ? `+${Math.min(stats.currentStreak, 2)} XP bonus!`
                    : "Complete a task to start your streak!"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Today's Progress */}
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            Today&apos;s Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">{stats.tasksCompletedToday}</div>
              <div className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Tasks Completed</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                {stats.pomodoroSessions}
              </div>
              <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Pomodoro Sessions</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                {stats.totalTasksCompleted} Total
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]">
              <Timer className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">Focus Time</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
