"use client"

import { useState } from "react"
import { format, isToday, isPast } from "date-fns"
import { CheckCircle2, Circle, Clock, AlertTriangle, Plus, X, Check, Brain, Sparkles, ArrowUpDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import { Checkbox } from "@/app/components/ui/checkbox"
import { useTodos, useUpdateTodo, useCreateTodo, useCreateMultipleTodos } from "@/hooks/useTodos"
import { useTaskBreakdown } from "@/hooks/use-task-breakdown"
import { useSmartPlan } from "@/hooks/use-smart-plan"
import type { Todo, Priority } from "@/app/generated/prisma"

export default function TodayTasks() {
  const { data: todos = [], isLoading } = useTodos()
  const updateTodo = useUpdateTodo()
  const createTodo = useCreateTodo()
  const createMultipleTodos = useCreateMultipleTodos()
  const {
    breakdown,
    isLoading: isBreakingDown,
    error: breakdownError,
    generateBreakdown,
    clearBreakdown,
  } = useTaskBreakdown()
  const {
    plan,
    isLoading: isPlanLoading,
    error: planError,
    generateSmartPlan,
    applySmartPlan,
    clearPlan,
  } = useSmartPlan()

  const [completingId, setCompletingId] = useState<string | null>(null)

  // Quick add task state
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("MEDIUM")
  const [isCreating, setIsCreating] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [selectedSubTasks, setSelectedSubTasks] = useState<string[]>([])

  // Filter today's tasks
  const todayTasks = todos.filter((todo) => (todo.dueDate ? isToday(new Date(todo.dueDate)) : false))
  const pendingTasks = todayTasks.filter((todo) => !todo.isCompleted)
  const completedTasks = todayTasks.filter((todo) => todo.isCompleted)

  const handleToggleComplete = async (todo: Todo) => {
    setCompletingId(todo.id)
    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        data: { isCompleted: !todo.isCompleted },
      })
    } finally {
      setCompletingId(null)
    }
  }

  const handleSmartPlan = async () => {
    if (pendingTasks.length === 0) return
    await generateSmartPlan(pendingTasks)
  }

  const handleApplyPlan = async () => {
    await applySmartPlan()
    clearPlan()
  }

  const handleBreakdownTask = async () => {
    if (!newTaskTitle.trim()) return
    await generateBreakdown(newTaskTitle.trim())
    setShowBreakdown(true)
  }

  const handleQuickAddTask = async () => {
    if (!newTaskTitle.trim()) return

    setIsCreating(true)
    try {
      const today = new Date()
      today.setHours(23, 59, 59, 999)

      await createTodo.mutateAsync({
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim() || undefined,
        priority: newTaskPriority,
        dueDate: today.toISOString(),
      })

      resetForm()
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleAddSelectedSubTasks = async () => {
    if (selectedSubTasks.length === 0) return

    setIsCreating(true)
    try {
      const today = new Date()
      today.setHours(23, 59, 59, 999)

      const newTodos = selectedSubTasks.map((taskTitle) => ({
        title: taskTitle,
        priority: newTaskPriority,
        dueDate: new Date(today), // Pass as Date object
        isCompleted: false,
        description: `Sub-task from: ${newTaskTitle}`,
        estimatedTime: 30,
        isAiSuggested: true,
        completedAt: null,
        timeSpent: 0,
      }))

      await createMultipleTodos.mutateAsync(newTodos)
      resetForm()
    } catch (error) {
      console.error("Failed to create sub-tasks:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const resetForm = () => {
    setNewTaskTitle("")
    setNewTaskDescription("")
    setNewTaskPriority("MEDIUM")
    setIsAddingTask(false)
    setShowBreakdown(false)
    setSelectedSubTasks([])
    clearBreakdown()
  }

  const toggleSubTaskSelection = (task: string) => {
    setSelectedSubTasks((prev) => (prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800 border-red-200"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "LOW":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "🔴"
      case "MEDIUM":
        return "🟡"
      case "LOW":
        return "🟢"
      default:
        return "⚪"
    }
  }

  if (isLoading) {
    return (
      <Card className="h-full bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border-[var(--secondarybg)]">
        <CardHeader className="pb-3">
          <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Today&apos;s Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)] rounded-lg animate-pulse"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border-[var(--secondarybg)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Today&apos;s Tasks
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
              {completedTasks.length}/{todayTasks.length}
            </div>
            {pendingTasks.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSmartPlan}
                disabled={isPlanLoading}
                className="text-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/10 p-1"
                title="AI Smart Plan - Optimize task order"
              >
                {isPlanLoading ? (
                  <div className="w-4 h-4 border-2 border-[var(--accent1bg)] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Brain className="w-4 h-4" />
                )}
              </Button>
            )}
            {!isAddingTask && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddingTask(true)}
                className="text-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/10 p-1"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {/* Smart Plan Results */}
        {plan && (
          <div className="p-3 rounded-lg bg-gradient-to-r from-[var(--accent1bg)]/10 to-purple-500/10 border border-[var(--accent1bg)]/20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
                <Brain className="w-4 h-4 text-[var(--accent1bg)]" />
                AI Optimized Order
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearPlan}
                className="text-[var(--mutedbg)] hover:text-red-600 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] opacity-80 mb-3">
              {plan.reasoning}
            </p>

            <div className="space-y-2 mb-3">
              {plan.plan.map((taskId, index) => {
                const task = todos.find((t) => t.id === taskId)
                if (!task) return null

                return (
                  <div
                    key={taskId}
                    className="flex items-center gap-2 p-2 rounded bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[var(--accent1bg)] text-white flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex-1 truncate">
                      {task.title}
                    </span>
                    <Badge className={`${getPriorityColor(task.priority)} text-xs`}>{task.priority}</Badge>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleApplyPlan}
                size="sm"
                className="bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white"
              >
                <ArrowUpDown className="w-4 h-4 mr-1" />
                Apply Order
              </Button>
              <Button
                onClick={clearPlan}
                variant="outline"
                size="sm"
                className="border-[var(--secondarybg)] text-[var(--accent2bg)] bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Quick Add Task Form */}
        {isAddingTask && (
          <div className="p-3 rounded-lg border-2 border-dashed border-[var(--accent1bg)] bg-[var(--accent1bg)]/5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">Add New Task</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                  className="text-[var(--mutedbg)] hover:text-red-600 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <Input
                placeholder="What needs to be done today?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="border-[var(--secondarybg)] bg-[var(--primarybg)] text-[var(--accent2bg)] 
                         focus:border-[var(--accent1bg)] focus:ring-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !showBreakdown) {
                    handleQuickAddTask()
                  } else if (e.key === "Escape") {
                    resetForm()
                  }
                }}
                autoFocus
              />

              <Textarea
                placeholder="Description (optional)"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="border-[var(--secondarybg)] bg-[var(--primarybg)] text-[var(--accent2bg)] 
                         focus:border-[var(--accent1bg)] focus:ring-0 resize-none"
                rows={2}
              />

              <div className="flex items-center gap-2">
                <Select value={newTaskPriority} onValueChange={(value: Priority) => setNewTaskPriority(value)}>
                  <SelectTrigger className="w-32 h-8 border-[var(--secondarybg)] bg-[var(--secondarybg)] text-[var(--accent2bg)]">
                    <SelectValue>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">{getPriorityIcon(newTaskPriority)}</span>
                        <span className="text-xs">{newTaskPriority}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--primarybg)] border-[var(--secondarybg)]">
                    {(["LOW", "MEDIUM", "HIGH"] as Priority[]).map((priority) => (
                      <SelectItem
                        key={priority}
                        value={priority}
                        className="text-[var(--accent2bg)] focus:bg-[var(--secondarybg)]"
                      >
                        <div className="flex items-center gap-2">
                          <span>{getPriorityIcon(priority)}</span>
                          <span>{priority}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-1 ml-auto">
                  <Button
                    size="sm"
                    onClick={handleBreakdownTask}
                    disabled={!newTaskTitle.trim() || isBreakingDown}
                    variant="outline"
                    className="h-8 px-3 border-[var(--accent1bg)] text-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/10 bg-transparent"
                  >
                    {isBreakingDown ? (
                      <div className="w-3 h-3 border-2 border-[var(--accent1bg)] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Brain className="w-3 h-3" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleQuickAddTask}
                    disabled={!newTaskTitle.trim() || isCreating}
                    className="h-8 px-3 bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white"
                  >
                    {isCreating ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Check className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>

              {/* AI Breakdown Results */}
              {breakdown && showBreakdown && (
                <div className="space-y-3 pt-3 border-t border-[var(--secondarybg)]">
                  <h5 className="font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--accent1bg)]" />
                    AI Suggested Sub-tasks
                  </h5>

                  <div className="space-y-2">
                    {breakdown.subTasks.map((task, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]"
                      >
                        <Checkbox
                          checked={selectedSubTasks.includes(task)}
                          onCheckedChange={() => toggleSubTaskSelection(task)}
                          className="border-[var(--accent1bg)] data-[state=checked]:bg-[var(--accent1bg)]"
                        />
                        <span className="text-sm text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex-1">
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => setSelectedSubTasks(breakdown.subTasks)}
                      variant="outline"
                      size="sm"
                      className="border-[var(--secondarybg)] text-[var(--accent2bg)]"
                    >
                      Select All
                    </Button>
                    <Button
                      onClick={() => setSelectedSubTasks([])}
                      variant="outline"
                      size="sm"
                      className="border-[var(--secondarybg)] text-[var(--accent2bg)]"
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={handleAddSelectedSubTasks}
                      disabled={selectedSubTasks.length === 0 || isCreating}
                      className="bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white ml-auto"
                    >
                      {isCreating ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Add Selected ({selectedSubTasks.length})
                    </Button>
                  </div>
                </div>
              )}

              {/* Error States */}
              {breakdownError && (
                <div className="p-2 rounded bg-red-50 border border-red-200">
                  <p className="text-sm text-red-800">{breakdownError}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error States */}
        {planError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-800">{planError}</p>
          </div>
        )}

        {todayTasks.length === 0 && !isAddingTask ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)] flex items-center justify-center">
              <Plus className="w-6 h-6 text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]" />
            </div>
            <p className="text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)] text-sm mb-3">
              No tasks scheduled for today
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingTask(true)}
              className="border-[var(--accent1bg)] text-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/10"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add your first task
            </Button>
          </div>
        ) : (
          <>
            {/* Pending Tasks */}
            {pendingTasks.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group
                  ${
                    todo.dueDate && isPast(new Date(todo.dueDate)) && !todo.isCompleted
                      ? "bg-red-50 border border-red-200"
                      : "bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)] hover:shadow-sm"
                  }`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto hover:bg-transparent"
                  onClick={() => handleToggleComplete(todo)}
                  disabled={completingId === todo.id}
                >
                  {completingId === todo.id ? (
                    <div className="w-5 h-5 border-2 border-[var(--accent1bg)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Circle className="w-5 h-5 text-[var(--mutedbg)] hover:text-[var(--accent1bg)] transition-colors" />
                  )}
                </Button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs">{getPriorityIcon(todo.priority)}</span>
                    <h4 className="font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] truncate">
                      {todo.title}
                    </h4>
                    {todo.dueDate && isPast(new Date(todo.dueDate)) && !todo.isCompleted && (
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {todo.estimatedTime && (
                      <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
                        ~{todo.estimatedTime} min
                      </div>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>
                    {todo.isAiSuggested && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Completed Tasks */}
            {completedTasks.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-[var(--mutedbg)] dark:bg-[var(--mutedbgdark)] opacity-60"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto hover:bg-transparent"
                  onClick={() => handleToggleComplete(todo)}
                  disabled={completingId === todo.id}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </Button>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] line-through truncate">
                    {todo.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    {todo.completedAt && (
                      <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
                        Completed at {format(new Date(todo.completedAt), "HH:mm")}
                      </div>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs border opacity-50 ${getPriorityColor(todo.priority)}`}
                    >
                      {todo.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  )
}
