import { useQuery } from "@tanstack/react-query"
import { useTodos } from "./useTodos"
import { format, subDays, startOfDay, endOfDay} from "date-fns"

export interface HeatmapDay {
  date: string
  count: number
  xp: number
  tasks: Array<{
    id: string
    title: string
    priority: string
    completedAt: string
  }>
}

export function useActivityHeatmap(days = 365) {
  const { data: todos = [] } = useTodos()

  return useQuery({
    queryKey: ["activity-heatmap", todos.length, days],
    queryFn: (): HeatmapDay[] => {
      const today = new Date()
      const completedTodos = todos.filter((todo) => todo.isCompleted && todo.completedAt)

      // Generate array of dates for the specified number of days
      const heatmapData: HeatmapDay[] = []

      for (let i = days - 1; i >= 0; i--) {
        const currentDate = subDays(today, i)
        const dateString = format(currentDate, "yyyy-MM-dd")

        // Find all tasks completed on this date
        const dayTasks = completedTodos.filter((todo) => {
          if (!todo.completedAt) return false
          const completedDate = new Date(todo.completedAt)
          const dayStart = startOfDay(currentDate)
          const dayEnd = endOfDay(currentDate)
          return completedDate >= dayStart && completedDate <= dayEnd
        })

        // Calculate XP for this day
        let dayXP = 0
        dayTasks.forEach((todo) => {
          // Base XP for task completion
          switch (todo.priority) {
            case "LOW":
              dayXP += 5
              break
            case "MEDIUM":
              dayXP += 10
              break
            case "HIGH":
              dayXP += 20
              break
          }

          // Bonus XP for completing before due date
          if (todo.dueDate && todo.completedAt) {
            const dueDate = new Date(todo.dueDate)
            const completedDate = new Date(todo.completedAt)
            if (completedDate < dueDate) {
              dayXP += 5
            }
          }

          // Bonus XP for AI suggested tasks
          if (todo.isAiSuggested) {
            dayXP += 10
          }
        })

        heatmapData.push({
          date: dateString,
          count: dayTasks.length,
          xp: dayXP,
          tasks: dayTasks.map((todo) => ({
            id: todo.id,
            title: todo.title,
            priority: String(todo.priority),
            completedAt: typeof todo.completedAt === "string" ? todo.completedAt : todo.completedAt?.toISOString() ?? "",
          })),
        })
      }

      return heatmapData
    },
    enabled: todos.length > 0,
  })
}
