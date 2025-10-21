"use client"

import { useEffect, useState } from "react"
import { getMatches } from "@/lib/services/match-service"
import type { Match } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import { formatDate } from "@/lib/utils/date"

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await getMatches()
      setMatches(data)
      setLoading(false)
    }
    fetchMatches()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Chargement des matchs...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Calendrier</h2>
        <p className="text-muted-foreground">Prochains matchs de la saison</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Card key={match.id} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(match.date)}
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  match.location === "Domicile" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {match.location}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">vs {match.opponent}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {match.location === "Domicile" ? "Stade Municipal" : `Stade de ${match.opponent}`}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
