"use client"

import { Award, Clock, Brain, Zap, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

const xpSources = [
  {
    action: "Complete Low Priority Task",
    xp: 5,
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    action: "Complete Medium Priority Task",
    xp: 10,
    icon: Target,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    action: "Complete High Priority Task",
    xp: 20,
    icon: Target,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    action: "Complete Pomodoro Session",
    xp: 10,
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    action: "Complete Task Before Due Time",
    xp: 5,
    icon: Zap,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    bonus: true,
  },
  {
    action: "Follow AI Suggested Task",
    xp: 10,
    icon: Brain,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    bonus: true,
  },
]

const streakBonuses = [
  { days: "1-2", xp: "1-2", color: "text-green-600" },
  { days: "5+", xp: "5", color: "text-yellow-600" },
  { days: "10+", xp: "10", color: "text-orange-600" },
]

export default function XPBreakdown() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* XP Sources */}
      <Card className="bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border-[var(--secondarybg)]">
        <CardHeader className="pb-4">
          <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent1bg)]" />
            XP Earning Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {xpSources.map((source, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]"
            >
              <div className={`w-10 h-10 rounded-full ${source.bgColor} flex items-center justify-center`}>
                <source.icon className={`w-5 h-5 ${source.color}`} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                    {source.action}
                  </h4>
                  {source.bonus && (
                    <span className="px-2 py-0.5 text-xs bg-[var(--accent1bg)] text-white rounded-full">BONUS</span>
                  )}
                </div>
                <p className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
                  +{source.xp} XP {source.bonus ? "bonus" : ""}
                </p>
              </div>

              <div className="text-right">
                <div className={`text-lg font-bold ${source.color}`}>+{source.xp}</div>
                <div className="text-xs text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">XP</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Streak System */}
      <Card className="bg-[var(--primarybg)] dark:bg-[var(--primarybgdark)] border-[var(--secondarybg)]">
        <CardHeader className="pb-4">
          <CardTitle className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" />
            Streak Bonus System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
              Maintain your streak by completing at least 1 task or 1 Pomodoro session daily
            </p>

            {streakBonuses.map((bonus, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-[var(--secondarybg)] dark:bg-[var(--secondarybgdark)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">{bonus.days}</span>
                  </div>
                  <span className="font-medium text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)]">
                    Day {bonus.days}
                  </span>
                </div>
                <div className={`font-bold ${bonus.color}`}>+{bonus.xp} XP</div>
              </div>
            ))}
          </div>

          {/* Level System Info */}
          <div className="pt-4 border-t border-[var(--secondarybg)] dark:border-[var(--secondarybgdark)]">
            <h4 className="font-semibold text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] mb-3">
              Level System
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">XP per Level</span>
                <span className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] font-medium">100 XP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Starting Level</span>
                <span className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] font-medium">Level 1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">Max Level</span>
                <span className="text-[var(--accent2bg)] dark:text-[var(--accent2bgdark)] font-medium">∞</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
