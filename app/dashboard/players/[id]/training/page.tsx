"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { getPlayerById } from "@/lib/services/player-service"
import type { Player } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Dumbbell, Clock } from "lucide-react"
import { calculateAge } from "@/lib/utils/age"

export default function PlayerTrainingPage() {
  const params = useParams()
  const playerId = params.id as string
  const [player, setPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const playerData = await getPlayerById(playerId)
      setPlayer(playerData)
      setLoading(false)
    }
    fetchData()
  }, [playerId])

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>
  }

  if (!player) {
    return <div className="text-center py-8">Joueur non trouvé</div>
  }

  const trainingProgram = [
    { day: "Lundi", focus: "Endurance", duration: "90 min" },
    { day: "Mardi", focus: "Technique individuelle", duration: "60 min" },
    { day: "Mercredi", focus: "Tactique collective", duration: "120 min" },
    { day: "Jeudi", focus: "Renforcement musculaire", duration: "75 min" },
    { day: "Vendredi", focus: "Jeu réduit", duration: "90 min" },
    { day: "Samedi", focus: "Match", duration: "90 min" },
    { day: "Dimanche", focus: "Repos", duration: "-" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/players">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{player.name}</h2>
        <p className="text-muted-foreground">
          {player.position} • {calculateAge(player.birthdate)} ans
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Dumbbell className="h-5 w-5" />
          Programme d'entraînement
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainingProgram.map((session) => (
            <Card key={session.day} className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{session.day}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {session.duration}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{session.focus}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Link href={`/dashboard/players/${playerId}/trophies`}>
          <Button variant="outline">Voir le palmarès</Button>
        </Link>
      </div>
    </div>
  )
}
