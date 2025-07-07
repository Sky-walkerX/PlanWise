"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { useTodos } from "@/hooks/useTodos"

type TimerMode = "work" | "shortBreak" | "longBreak"

export default function PomodoroTimer() {
  const { data: todos = [] } = useTodos()
  const [selectedTodoId, setSelectedTodoId] = useState<string>("")
  const [mode, setMode] = useState<TimerMode>("work")
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // ✅ Memoized durations object
  const durations = useMemo(() => ({
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  }), [])

  const activeTodos = todos.filter((todo) => !todo.isCompleted)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      if (timeLeft === 0 && isRunning) {
        setIsRunning(false)
        if (mode === "work") {
          setSessions((prev) => prev + 1)
          const nextMode = sessions > 0 && (sessions + 1) % 4 === 0 ? "longBreak" : "shortBreak"
          setMode(nextMode)
          setTimeLeft(durations[nextMode])
        } else {
          setMode("work")
          setTimeLeft(durations.work)
        }
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, mode, sessions, durations])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(durations[mode])
  }
  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode)
    setTimeLeft(durations[newMode])
    setIsRunning(false)
  }

  const progress = ((durations[mode] - timeLeft) / durations[mode]) * 100

  const getModeColor = () => {
    switch (mode) {
      case "work":
        return "text-[var(--accent1bg)]"
      case "shortBreak":
        return "text-green-600"
      case "longBreak":
        return "text-blue-600"
    }
  }

  const getModeLabel = () => {
    switch (mode) {
      case "work":
        return "Focus Time"
      case "shortBreak":
        return "Short Break"
      case "longBreak":
        return "Long Break"
    }
  }

  return (
    <Card className="h-full bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border-[var(--secondarybg)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--accent1bg)]"></div>
          Timer
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex gap-2">
          {(["work", "shortBreak", "longBreak"] as TimerMode[]).map((timerMode) => (
            <Button
              key={timerMode}
              variant={mode === timerMode ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeChange(timerMode)}
              className={`text-xs ${
                mode === timerMode
                  ? "bg-[var(--accent1bg)] text-white"
                  : "border-[var(--secondarybg)] text-[var(--accent2bg)]"
              }`}
            >
              {timerMode === "work" ? "Work" : timerMode === "shortBreak" ? "Short" : "Long"}
            </Button>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="var(--secondarybg)" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="var(--accent1bg)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                  {formatTime(timeLeft)}
                </div>
                <div className={`text-xs font-medium ${getModeColor()}`}>{getModeLabel()}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Button
              onClick={isRunning ? handlePause : handleStart}
              className="bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-[var(--secondarybg)] text-[var(--accent2bg)] bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {activeTodos.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
              Working on:
            </label>
            <Select value={selectedTodoId} onValueChange={setSelectedTodoId}>
              <SelectTrigger className="border-[var(--secondarybg)] bg-[var(--secondarybg)] text-[var(--accent2bg)]">
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--primarybg)] border-[var(--secondarybg)]">
                {activeTodos.map((todo) => (
                  <SelectItem
                    key={todo.id}
                    value={todo.id}
                    className="text-[var(--accent2bg)] focus:bg-[var(--secondarybg)]"
                  >
                    {todo.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="text-center">
          <div className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
            Sessions completed: {sessions}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
