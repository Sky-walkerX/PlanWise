"use client"

import type React from "react"

import { useState } from "react"
import { format, getDay, parseISO } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Calendar, TrendingUp } from "lucide-react"
import { useActivityHeatmap, type HeatmapDay } from "@/hooks/use-activity-heatmap"

interface TooltipData {
  day: HeatmapDay
  x: number
  y: number
}

export default function ActivityHeatmap() {
  const { data: heatmapData = [], isLoading } = useActivityHeatmap(365) // Full year
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)

  const getIntensityLevel = (count: number, xp: number) => {
    if (count === 0) return 0
    if (xp >= 50) return 5
    if (xp >= 30) return 4
    if (xp >= 15) return 3
    if (xp >= 5) return 2
    return 1
  }

  const getIntensityColor = (level: number) => {
    const colors = [
      "bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]", // 0 - no activity
      "bg-[var(--accent1bg)]/20", // 1 - minimal
      "bg-[var(--accent1bg)]/40", // 2 - light
      "bg-[var(--accent1bg)]/60", // 3 - moderate
      "bg-[var(--accent1bg)]/80", // 4 - high
      "bg-[var(--accent1bg)]", // 5 - maximum
    ]
    return colors[level] || colors[0]
  }

  const getTooltipText = (day: HeatmapDay) => {
    const date = format(parseISO(day.date), "EEEE, MMMM d, yyyy")
    if (day.count === 0) return `${date}: No tasks completed`

    const taskText = day.count === 1 ? "task" : "tasks"
    return `${date}: ${day.count} ${taskText} completed, ${day.xp} XP earned`
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800"
      case "LOW":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Group days by weeks for proper heatmap layout
  const weeks: HeatmapDay[][] = []
  let currentWeek: HeatmapDay[] = []

  heatmapData.forEach((day, index) => {
    const dayOfWeek = getDay(parseISO(day.date))

    // Start new week on Sunday
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push([...currentWeek])
      currentWeek = []
    }

    currentWeek.push(day)

    // Push the last week
    if (index === heatmapData.length - 1 && currentWeek.length > 0) {
      weeks.push([...currentWeek])
    }
  })

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Calculate stats
  const totalTasks = heatmapData.reduce((sum, day) => sum + day.count, 0)
  const totalXP = heatmapData.reduce((sum, day) => sum + day.xp, 0)
  const activeDays = heatmapData.filter((day) => day.count > 0).length
  const maxDayTasks = Math.max(...heatmapData.map((day) => day.count))
  const maxDayXP = Math.max(...heatmapData.map((day) => day.xp))

  const handleMouseEnter = (day: HeatmapDay, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltip({
      day,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    })
  }

  const handleMouseLeave = () => {
    setTooltip(null)
  }

  if (isLoading) {
    return (
      <Card className="bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border-[var(--secondarybg)]">
        <CardHeader className="pb-4">
          <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[var(--accent1bg)]" />
            Activity Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-32 bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)] rounded-lg animate-pulse" />
            <div className="h-4 bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)] rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border-[var(--secondarybg)]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--accent1bg)]" />
              Activity Heatmap
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>{totalTasks} tasks completed</span>
              </div>
              <div>{activeDays} active days</div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]">
                <div className="text-2xl font-bold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                  {totalTasks}
                </div>
                <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Total Tasks</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]">
                <div className="text-2xl font-bold text-[var(--accent1bg)]">{totalXP}</div>
                <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Total XP</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]">
                <div className="text-2xl font-bold text-green-600">{activeDays}</div>
                <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Active Days</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]">
                <div className="text-2xl font-bold text-purple-600">{maxDayTasks}</div>
                <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Best Day</div>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {/* Day labels */}
                <div className="flex flex-col gap-1 mr-2">
                  <div className="h-4"></div> {/* Spacer for month labels */}
                  {dayLabels.map((day, index) => (
                    <div
                      key={day}
                      className="h-3 text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)] flex items-center"
                      style={{ display: index % 2 === 0 ? "flex" : "none" }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Heatmap cells */}
                <div className="flex gap-1">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {/* Month label */}
                      <div className="h-4 text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)] text-center">
                        {weekIndex % 4 === 0 && week[0] ? monthLabels[parseISO(week[0].date).getMonth()] : ""}
                      </div>

                      {/* Fill empty days at start of week */}
                      {week.length < 7 &&
                        weekIndex === 0 &&
                        Array.from({ length: 7 - week.length }).map((_, emptyIndex) => (
                          <div key={`empty-${emptyIndex}`} className="w-3 h-3"></div>
                        ))}

                      {/* Actual days */}
                      {week.map((day) => {
                        const intensityLevel = getIntensityLevel(day.count, day.xp)
                        return (
                          <div
                            key={day.date}
                            className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:scale-110 hover:ring-2 hover:ring-[var(--accent1bg)] hover:ring-opacity-50 ${getIntensityColor(intensityLevel)}`}
                            onMouseEnter={(e) => handleMouseEnter(day, e)}
                            onMouseLeave={handleMouseLeave}
                          />
                        )
                      })}

                      {/* Fill empty days at end of week */}
                      {week.length < 7 &&
                        weekIndex === weeks.length - 1 &&
                        Array.from({ length: 7 - week.length }).map((_, emptyIndex) => (
                          <div key={`empty-end-${emptyIndex}`} className="w-3 h-3"></div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4, 5].map((level) => (
                    <div key={level} className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`}></div>
                  ))}
                </div>
                <span>More</span>
              </div>

              <div className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
                Best day: {maxDayTasks} tasks, {maxDayXP} XP
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translateX(-50%) translateY(-100%)",
          }}
        >
          <div className="bg-[var(--accent2bg)] dark:bg-[var(--accent2bgdark)] text-[var(--primarybg)] dark:text-[var(--primarybgdark)] px-3 py-2 rounded-lg shadow-lg text-sm max-w-xs">
            <div className="font-medium mb-1">{getTooltipText(tooltip.day)}</div>
            {tooltip.day.tasks.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs opacity-75">Tasks completed:</div>
                {tooltip.day.tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center gap-2 text-xs">
                    <Badge className={`${getPriorityColor(task.priority)} text-xs px-1 py-0`}>{task.priority}</Badge>
                    <span className="truncate">{task.title}</span>
                  </div>
                ))}
                {tooltip.day.tasks.length > 3 && (
                  <div className="text-xs opacity-75">+{tooltip.day.tasks.length - 3} more tasks</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
