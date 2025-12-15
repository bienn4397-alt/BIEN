"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"
import {
  BarChart3,
  Calendar,
  Facebook,
  Home,
  Instagram,
  Linkedin,
  LogOut,
  Menu,
  Settings,
  Twitter,
  Users,
  Youtube,
  Plus,
  Zap
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Publications", href: "/dashboard/posts", icon: Zap },
  { name: "Planification", href: "/dashboard/schedule", icon: Calendar },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Réseaux Sociaux", href: "/dashboard/accounts", icon: Users },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
]

const socialPlatforms = [
  { name: "Facebook", icon: Facebook, connected: true },
  { name: "Instagram", icon: Instagram, connected: true },
  { name: "Twitter", icon: Twitter, connected: false },
  { name: "LinkedIn", icon: Linkedin, connected: true },
  { name: "YouTube", icon: Youtube, connected: false },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-200 z-40",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-primary">SocialHub</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="shrink-0"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Connected Accounts */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Comptes Connectés
            </h3>
            <div className="space-y-2">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <div
                    key={platform.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center">
                      <Icon className="h-4 w-4" />
                      <span className="ml-2">{platform.name}</span>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      platform.connected ? "bg-green-500" : "bg-gray-300"
                    )} />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              {user?.name?.charAt(0) || "U"}
            </div>
            {!isCollapsed && (
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name || "Utilisateur"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 justify-start"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
