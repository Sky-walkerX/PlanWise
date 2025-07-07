"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Home, CheckSquare, BarChart3, 
  User, LogOut, Sun, Moon, Menu, X
} from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Badge } from "@/app/components/ui/badge"
import { useTodos } from "@/hooks/useTodos"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
    description: "Overview and today's tasks",
  },
  {
    name: "All Tasks",
    href: "/tasks",
    icon: CheckSquare,
    description: "Manage all your todos",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Productivity insights",
  },
]

export default function Navbar() {
  const { data: session, status } = useSession()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const { data: todos = [] } = useTodos()

  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const pendingTodos = todos.filter(todo => !todo.isCompleted)
  const todayTodos = todos.filter(todo => {
    if (!todo.dueDate) return false
    const today = new Date()
    const dueDate = new Date(todo.dueDate)
    return dueDate.toDateString() === today.toDateString() && !todo.isCompleted
  })

  const userInitials = session?.user?.name
    ? session.user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : session?.user?.email?.[0].toUpperCase() || "U"

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--secondarybg)] bg-[var(--primarybg)]/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-bold text-[var(--accent2bg)]">PlanWise</h1>
                <p className="text-xs text-[var(--mutedbg)] hidden sm:block">
                  Stay focused, get things done
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map(item => {
                const isActive = isActivePath(item.href)
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    onClick={() => router.push(item.href)}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--accent1bg)] text-white shadow-sm"
                        : "text-[var(--accent2bg)] hover:bg-[var(--secondarybg)]"
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                    {item.name === "All Tasks" && pendingTodos.length > 0 && (
                      <Badge className="ml-2 bg-[var(--accent1bg)] text-white text-xs px-1.5 py-0.5 h-5">
                        {pendingTodos.length}
                      </Badge>
                    )}
                    {item.name === "Dashboard" && todayTodos.length > 0 && (
                      <Badge className="ml-2 bg-green-500 text-white text-xs px-1.5 py-0.5 h-5">
                        {todayTodos.length}
                      </Badge>
                    )}
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-lg bg-[var(--secondarybg)]">
              <div className="text-center">
                <div className="text-sm font-semibold text-[var(--accent2bg)]">{todayTodos.length}</div>
                <div className="text-xs text-[var(--mutedbg)]">Today</div>
              </div>
              <div className="w-px h-8 bg-[var(--mutedbg)] opacity-30" />
              <div className="text-center">
                <div className="text-sm font-semibold text-[var(--accent2bg)]">{pendingTodos.length}</div>
                <div className="text-xs text-[var(--mutedbg)]">Pending</div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 p-0 text-[var(--accent2bg)] hover:bg-[var(--secondarybg)]"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {status === "authenticated" && session?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                    <Avatar className="h-9 w-9 border-2 border-[var(--accent1bg)]">
                      <AvatarFallback className="bg-[var(--accent1bg)] text-white font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-80 bg-[var(--primarybg)] border-[var(--secondarybg)]"
                  align="end"
                >
                  <div className="flex items-center gap-3 p-3">
                    <Avatar className="h-10 w-10 border-2 border-[var(--accent1bg)]">
                      <AvatarFallback className="bg-[var(--accent1bg)] text-white">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-[var(--accent2bg)]">{session.user.name || "User"}</p>
                      <p className="text-sm text-[var(--mutedbg)] truncate">{session.user.email}</p>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-[var(--secondarybg)]" />

                  <div className="p-2 space-y-1">
                    <DropdownMenuItem
                      className="text-[var(--accent2bg)] focus:bg-[var(--secondarybg)] cursor-pointer"
                      onClick={() => router.push("/profile")}
                    >
                      <User className="mr-3 h-4 w-5" />
                      Profile Settings
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                      className="text-[var(--accent2bg)] focus:bg-[var(--secondarybg)] cursor-pointer"
                      onClick={() => router.push("/settings")}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      App Settings
                    </DropdownMenuItem> */}
                  </div>

                  <DropdownMenuSeparator className="bg-[var(--secondarybg)]" />

                  <div className="p-2">
                    <DropdownMenuItem
                      className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden w-9 h-9 p-0 text-[var(--accent2bg)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--secondarybg)] py-4">
            <div className="space-y-2">
              {navigationItems.map(item => {
                const isActive = isActivePath(item.href)
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    onClick={() => {
                      router.push(item.href)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full justify-start px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--accent1bg)] text-white"
                        : "text-[var(--accent2bg)] hover:bg-[var(--secondarybg)]"
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                    {item.name === "All Tasks" && pendingTodos.length > 0 && (
                      <Badge className="bg-[var(--accent1bg)] text-white text-xs">
                        {pendingTodos.length}
                      </Badge>
                    )}
                    {item.name === "Dashboard" && todayTodos.length > 0 && (
                      <Badge className="bg-green-500 text-white text-xs">
                        {todayTodos.length}
                      </Badge>
                    )}
                  </Button>
                )
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--secondarybg)]">
              <div className="flex justify-around py-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-[var(--accent2bg)]">{todayTodos.length}</div>
                  <div className="text-xs text-[var(--mutedbg)]">Today&apos;s Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[var(--accent2bg)]">{pendingTodos.length}</div>
                  <div className="text-xs text-[var(--mutedbg)]">Pending Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[var(--accent2bg)]">
                    {todos.filter(t => t.isCompleted).length}
                  </div>
                  <div className="text-xs text-[var(--mutedbg)]">Completed</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
