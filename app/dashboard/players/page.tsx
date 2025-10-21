"use client"

import { useEffect, useState } from "react"
import { getPlayers } from "@/lib/services/player-service"
import type { Player } from "@/lib/types"
import { PlayerCard } from "@/components/player-card"

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await getPlayers()
      setPlayers(data)
      setLoading(false)
    }
    fetchPlayers()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Chargement des joueurs...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Effectif</h2>
        <p className="text-muted-foreground">Gérez les joueurs de votre club</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  )
}
