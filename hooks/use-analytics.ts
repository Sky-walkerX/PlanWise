import { useQuery } from "@tanstack/react-query"
import { useTodos } from "./useTodos"
import { subDays, format, isToday, startOfWeek, addDays } from "date-fns" // Import startOfWeek and addDays

export interface UserStats {
  totalXP: number
  level: number
  currentStreak: number
  longestStreak: number
  xpToNextLevel: number
  xpForCurrentLevel: number
  totalTasksCompleted: number
  pomodoroSessions: number
  tasksCompletedToday: number
  weeklyProgress: number[]
  heatmapData: { date: string; count: number; xp: number }[]
}

export function useAnalytics() {
  const { data: todos = [] } = useTodos()

  return useQuery({
    queryKey: ["analytics", todos],
    queryFn: (): UserStats => {
      const completedTodos = todos.filter((todo) => todo.isCompleted && todo.completedAt)

      // Calculate total XP (rest of this logic is fine, no changes needed)
      let totalXP = 0
      completedTodos.forEach((todo) => {
        // Base XP for task completion
        switch (todo.priority) {
          case "LOW":
            totalXP += 5
            break
          case "MEDIUM":
            totalXP += 10
            break
          case "HIGH":
            totalXP += 20
            break
        }

        // Bonus XP for completing before due date
        if (todo.dueDate && todo.completedAt) {
          const dueDate = new Date(todo.dueDate)
          const completedDate = new Date(todo.completedAt)
          if (completedDate < dueDate) {
            totalXP += 5
          }
        }

        // Bonus XP for AI suggested tasks
        if (todo.isAiSuggested) {
          totalXP += 10
        }
      })

      // Mock Pomodoro sessions (you can replace with real data)
      const pomodoroSessions = Math.floor(completedTodos.length * 0.7) // Assume 70% of tasks had pomodoro
      totalXP += pomodoroSessions * 10

      // Calculate level
      const level = Math.floor(totalXP / 100) + 1
      const xpForCurrentLevel = (level - 1) * 100
      const xpToNextLevel = level * 100 - totalXP

      // Calculate streaks (rest of this logic is fine, no changes needed)
      const today = new Date()
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = subDays(today, i)
        const dayTodos = completedTodos.filter((todo) => {
          if (!todo.completedAt) return false
          const completedDate = new Date(todo.completedAt)
          return format(completedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
        })
        return {
          date: format(date, "yyyy-MM-dd"),
          count: dayTodos.length,
          xp: dayTodos.reduce((acc, todo) => {
            let xp = 0
            switch (todo.priority) {
              case "LOW":
                xp += 5
                break
              case "MEDIUM":
                xp += 10
                break
                case "HIGH":
                xp += 20
                break
            }
            if (todo.dueDate && todo.completedAt) {
              const dueDate = new Date(todo.dueDate)
              const completedDate = new Date(todo.completedAt)
              if (completedDate < dueDate) xp += 5
            }
            if (todo.isAiSuggested) xp += 10
            return acc + xp
          }, 0),
        }
      }).reverse()

      // Calculate current streak
      let currentStreak = 0
      for (let i = last30Days.length - 1; i >= 0; i--) {
        if (last30Days[i].count > 0) {
          currentStreak++
        } else {
          break
        }
      }

      // Calculate longest streak
      let longestStreak = 0
      let tempStreak = 0
      last30Days.forEach((day) => {
        if (day.count > 0) {
          tempStreak++
          longestStreak = Math.max(longestStreak, tempStreak)
        } else {
          tempStreak = 0
        }
      })

      // Add streak bonus XP
      if (currentStreak > 0) {
        if (currentStreak >= 10) totalXP += 10
        else if (currentStreak >= 5) totalXP += 5
        else totalXP += Math.min(currentStreak, 2)
      }

      // Tasks completed today
      const tasksCompletedToday = completedTodos.filter((todo) => {
        if (!todo.completedAt) return false
        return isToday(new Date(todo.completedAt))
      }).length

      // *** MODIFIED WEEKLY PROGRESS CALCULATION ***
      const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 }); // Sunday is 0
      const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
        const date = addDays(startOfCurrentWeek, i); // Get each day of the week
        return completedTodos.filter((todo) => {
          if (!todo.completedAt) return false;
          const completedDate = new Date(todo.completedAt);
          return format(completedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
        }).length;
      });
      // *** END MODIFIED WEEKLY PROGRESS CALCULATION ***

      return {
        totalXP,
        level,
        currentStreak,
        longestStreak,
        xpToNextLevel,
        xpForCurrentLevel,
        totalTasksCompleted: completedTodos.length,
        pomodoroSessions,
        tasksCompletedToday,
        weeklyProgress,
        heatmapData: last30Days,
      }
    },
    enabled: todos.length > 0,
  })
}