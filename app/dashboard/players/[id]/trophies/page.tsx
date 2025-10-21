"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { getPlayerById, getTrophiesForPlayer } from "@/lib/services/player-service"
import type { Player, Trophy } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrophyIcon } from "lucide-react"
import { calculateAge } from "@/lib/utils/age"

export default function PlayerTrophiesPage() {
  const params = useParams()
  const playerId = params.id as string
  const [player, setPlayer] = useState<Player | null>(null)
  const [trophies, setTrophies] = useState<Trophy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [playerData, trophiesData] = await Promise.all([getPlayerById(playerId), getTrophiesForPlayer(playerId)])
      setPlayer(playerData)
      setTrophies(trophiesData)
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
          <TrophyIcon className="h-5 w-5" />
          Palmarès ({trophies.length})
        </h3>

        {trophies.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">Aucun trophée pour le moment</Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trophies.map((trophy) => (
              <Card key={trophy.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <TrophyIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{trophy.name}</h4>
                    <p className="text-sm text-muted-foreground">{trophy.year}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Link href={`/dashboard/players/${playerId}/training`}>
          <Button variant="outline">Voir l'entraînement</Button>
        </Link>
      </div>
    </div>
  )
}
