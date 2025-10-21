"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Users, Calendar } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">CLUB MANAGER</h1>

            <nav className="flex items-center gap-6">
              <Link
                href="/dashboard/players"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <Users className="h-4 w-4" />
                Joueurs
              </Link>
              <Link
                href="/dashboard/matches"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Matchs
              </Link>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
