"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Brain,
} from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Card, CardContent } from "@/app/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import AISuggestionsPanel from "@/app/components/ai-suggestion-panel"

type Todo = {
  id: string
  title: string
  description?: string
  isCompleted: boolean
  priority: "LOW" | "MEDIUM" | "HIGH"
  dueDate?: string
  estimatedTime?: number
  createdAt: string
  completedAt?: string
}

type FilterOption = "all" | "pending" | "completed" | "overdue" | "today"

export default function TasksPage() {
  const { status } = useSession()
  const router = useRouter()

  // State
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState<FilterOption>("all")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAISuggestions, setShowAISuggestions] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState<{
    title: string
    description: string
    priority: "LOW" | "MEDIUM" | "HIGH"
    dueDate: string
    estimatedTime: string
  }>({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
    estimatedTime: "",
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch("/api/todos")
          if (response.ok) {
            const data = await response.json()
            setTodos(data)
          }
        } catch (error) {
          console.error("Failed to fetch todos:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchTodos()
  }, [status])

  // Filter todos
  const filteredTodos = useMemo(() => {
    let filtered = todos

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          (todo.description && todo.description.toLowerCase().includes(query)),
      )
    }

    // Status filter
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    switch (filterBy) {
      case "pending":
        filtered = filtered.filter((todo) => !todo.isCompleted)
        break
      case "completed":
        filtered = filtered.filter((todo) => todo.isCompleted)
        break
      case "overdue":
        filtered = filtered.filter((todo) => !todo.isCompleted && todo.dueDate && new Date(todo.dueDate) < now)
        break
      case "today":
        filtered = filtered.filter(
          (todo) => todo.dueDate && new Date(todo.dueDate).toDateString() === today.toDateString(),
        )
        break
    }

    return filtered.sort((a, b) => {
      // Sort by completion status first, then by due date
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1
      }

      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }

      if (a.dueDate) return -1
      if (b.dueDate) return 1

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [todos, searchQuery, filterBy])

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
      estimatedTime: "",
    })
  }

  // Create todo
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    setActionLoading("create")
    try {
      const todoData = {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        priority: formData.priority,
        dueDate: formData.dueDate || undefined,
        estimatedTime: formData.estimatedTime ? Number.parseInt(formData.estimatedTime) : undefined,
      }

      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      })

      if (response.ok) {
        const newTodo = await response.json()
        setTodos([newTodo, ...todos])
        resetForm()
        setShowAddForm(false)
      }
    } catch (error) {
      console.error("Failed to create todo:", error)
    } finally {
      setActionLoading(null)
    }
  }

  // Update todo
  const handleUpdate = async (id: string, updates: Partial<Todo>) => {
    setActionLoading(id)
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)))
        setEditingId(null)
      }
    } catch (error) {
      console.error("Failed to update todo:", error)
    } finally {
      setActionLoading(null)
    }
  }

  // Delete todo
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return

    setActionLoading(id)
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete todo:", error)
    } finally {
      setActionLoading(null)
    }
  }

  // Toggle completion
  const handleToggleComplete = (todo: Todo) => {
    handleUpdate(todo.id, {
      isCompleted: !todo.isCompleted,
      completedAt: !todo.isCompleted ? new Date().toISOString() : undefined,
    })
  }

  // Start editing
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setFormData({
      title: todo.title,
      description: todo.description || "",
      priority: todo.priority,
      dueDate: todo.dueDate ? format(new Date(todo.dueDate), "yyyy-MM-dd") : "",
      estimatedTime: todo.estimatedTime?.toString() || "",
    })
  }

  // Save edit
  const saveEdit = (id: string) => {
    if (!formData.title.trim()) return

    handleUpdate(id, {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      priority: formData.priority,
      dueDate: formData.dueDate || undefined,
      estimatedTime: formData.estimatedTime ? Number.parseInt(formData.estimatedTime) : undefined,
    })
  }

  // Get priority color
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

  // Get filter counts
  const filterCounts = useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    return {
      all: todos.length,
      pending: todos.filter((t) => !t.isCompleted).length,
      completed: todos.filter((t) => t.isCompleted).length,
      overdue: todos.filter((t) => !t.isCompleted && t.dueDate && new Date(t.dueDate) < now).length,
      today: todos.filter((t) => t.dueDate && new Date(t.dueDate).toDateString() === today.toDateString()).length,
    }
  }, [todos])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-[var(--accent1bg)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">Loading tasks...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") return null

  return (
    <div className="min-h-screen bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">All Tasks</h1>
            <p className="text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)] mt-1">Manage your tasks efficiently</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              variant="outline"
              className="border-[var(--accent1bg)] text-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/10"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Coach
            </Button>
            <Button
              onClick={() => {
                resetForm()
                setShowAddForm(true)
              }}
              className="bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className={`${showAISuggestions ? "lg:col-span-2" : "lg:col-span-3"} space-y-6`}>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--mutedbg)]" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[var(--secondarybg)] bg-[var(--secondarybg)] text-[var(--accent2bg)]"
                />
              </div>

              <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
                <SelectTrigger className="w-full sm:w-48 border-[var(--secondarybg)] bg-[var(--secondarybg)]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[var(--primarybg)] border-[var(--secondarybg)]">
                  <SelectItem value="all">All ({filterCounts.all})</SelectItem>
                  <SelectItem value="pending">Pending ({filterCounts.pending})</SelectItem>
                  <SelectItem value="completed">Completed ({filterCounts.completed})</SelectItem>
                  <SelectItem value="overdue">Overdue ({filterCounts.overdue})</SelectItem>
                  <SelectItem value="today">Due Today ({filterCounts.today})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <Card className="border-2 border-[var(--accent1bg)] bg-[var(--primarybg)]">
                <CardContent className="p-6">
                  <form onSubmit={handleCreate} className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[var(--accent2bg)]">Add New Task</h3>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Input
                          placeholder="Task title *"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="border-[var(--secondarybg)] bg-[var(--secondarybg)]"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Textarea
                          placeholder="Description (optional)"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="border-[var(--secondarybg)] bg-[var(--secondarybg)] resize-none"
                          rows={2}
                        />
                      </div>

                      <Select
                        value={formData.priority}
                        onValueChange={(value: "LOW" | "MEDIUM" | "HIGH") =>
                          setFormData({ ...formData, priority: value })
                        }
                      >
                        <SelectTrigger className="border-[var(--secondarybg)] bg-[var(--secondarybg)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LOW">🟢 Low Priority</SelectItem>
                          <SelectItem value="MEDIUM">🟡 Medium Priority</SelectItem>
                          <SelectItem value="HIGH">🔴 High Priority</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="border-[var(--secondarybg)] bg-[var(--secondarybg)]"
                      />

                      <Input
                        type="number"
                        placeholder="Estimated time (minutes)"
                        value={formData.estimatedTime}
                        onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                        className="border-[var(--secondarybg)] bg-[var(--secondarybg)]"
                        min="1"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        type="submit"
                        disabled={!formData.title.trim() || actionLoading === "create"}
                        className="bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white"
                      >
                        {actionLoading === "create" ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                          <Plus className="w-4 h-4 mr-2" />
                        )}
                        Create Task
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                        className="border-[var(--secondarybg)] text-[var(--accent2bg)]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTodos.length === 0 ? (
                <Card className="border-2 border-dashed border-[var(--secondarybg)]">
                  <CardContent className="py-12 text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-[var(--accent2bg)] mb-2">
                      {searchQuery || filterBy !== "all" ? "No tasks found" : "No tasks yet"}
                    </h3>
                    <p className="text-[var(--mutedbg)] mb-4">
                      {searchQuery || filterBy !== "all"
                        ? "Try adjusting your search or filter"
                        : "Create your first task to get started!"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredTodos.map((todo) => (
                  <Card
                    key={todo.id}
                    className={`transition-all duration-200 ${
                      todo.isCompleted ? "bg-[var(--mutedbg)]/20 opacity-75" : "bg-[var(--primarybg)] hover:shadow-md"
                    } border-[var(--secondarybg)]`}
                  >
                    <CardContent className="p-6">
                      {editingId === todo.id ? (
                        // Edit Mode
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="border-[var(--secondarybg)] bg-[var(--secondarybg)]"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="border-[var(--secondarybg)] bg-[var(--secondarybg)] resize-none"
                                rows={2}
                              />
                            </div>

                            <Select
                              value={formData.priority}
                              onValueChange={(value: "LOW" | "MEDIUM" | "HIGH") =>
                                setFormData({ ...formData, priority: value })
                              }
                            >
                              <SelectTrigger className="border-[var(--secondarybg)] bg-[var(--secondarybg)]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="LOW">🟢 Low Priority</SelectItem>
                                <SelectItem value="MEDIUM">🟡 Medium Priority</SelectItem>
                                <SelectItem value="HIGH">🔴 High Priority</SelectItem>
                              </SelectContent>
                            </Select>

                            <Input
                              type="date"
                              value={formData.dueDate}
                              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                              className="border-[var(--secondarybg)] bg-[var(--secondarybg)]"
                            />

                            <Input
                              type="number"
                              placeholder="Estimated time (minutes)"
                              value={formData.estimatedTime}
                              onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                              className="border-[var(--secondarybg)] bg-[var(--secondarybg)]"
                              min="1"
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => saveEdit(todo.id)}
                              disabled={!formData.title.trim() || actionLoading === todo.id}
                              size="sm"
                              className="bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white"
                            >
                              {actionLoading === todo.id ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              ) : (
                                <Check className="w-4 h-4 mr-2" />
                              )}
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingId(null)}
                              variant="outline"
                              size="sm"
                              className="border-[var(--secondarybg)] text-[var(--accent2bg)]"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div className="flex items-start gap-4">
                          {/* Completion Toggle */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleComplete(todo)}
                            disabled={actionLoading === todo.id}
                            className="p-1 h-auto mt-1"
                          >
                            {actionLoading === todo.id ? (
                              <div className="w-5 h-5 border-2 border-[var(--accent1bg)] border-t-transparent rounded-full animate-spin" />
                            ) : todo.isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-[var(--mutedbg)] hover:text-[var(--accent1bg)]" />
                            )}
                          </Button>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3
                                className={`text-lg font-semibold ${
                                  todo.isCompleted ? "line-through text-[var(--mutedbg)]" : "text-[var(--accent2bg)]"
                                }`}
                              >
                                {todo.title}
                              </h3>

                              <div className="flex items-center gap-2">
                                <Badge className={`${getPriorityColor(todo.priority)} text-xs`}>{todo.priority}</Badge>

                                {!todo.isCompleted && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => startEdit(todo)}
                                      className="p-1 h-auto text-[var(--mutedbg)] hover:text-[var(--accent2bg)]"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDelete(todo.id)}
                                      disabled={actionLoading === todo.id}
                                      className="p-1 h-auto text-[var(--mutedbg)] hover:text-red-600"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>

                            {todo.description && (
                              <p
                                className={`text-sm mb-3 ${
                                  todo.isCompleted ? "line-through text-[var(--mutedbg)]" : "text-[var(--accent2bg)]/80"
                                }`}
                              >
                                {todo.description}
                              </p>
                            )}

                            {/* Metadata */}
                            <div className="flex flex-wrap gap-4 text-sm text-[var(--mutedbg)]">
                              {todo.dueDate && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>Due: {format(new Date(todo.dueDate), "MMM d, yyyy")}</span>
                                  {!todo.isCompleted && new Date(todo.dueDate) < new Date() && (
                                    <AlertTriangle className="w-4 h-4 text-red-500 ml-1" />
                                  )}
                                </div>
                              )}

                              {todo.estimatedTime && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{todo.estimatedTime} min</span>
                                </div>
                              )}

                              {todo.completedAt && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  <span>
                                    Completed: {format(new Date(todo.completedAt), "MMM d, yyyy 'at' h:mm a")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Results Summary */}
            {filteredTodos.length > 0 && (
              <div className="text-center">
                <p className="text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
                  Showing {filteredTodos.length} of {todos.length} tasks
                </p>
              </div>
            )}
          </div>

          {/* AI Suggestions Sidebar */}
          {showAISuggestions && (
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <AISuggestionsPanel />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
