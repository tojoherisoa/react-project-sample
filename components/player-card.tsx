import Link from "next/link"
import type { Player } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Dumbbell } from "lucide-react"
import { calculateAge } from "@/lib/utils/age"

interface PlayerCardProps {
  player: Player
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/4] relative bg-muted">
        <img src={player.imageUrl || "/placeholder.svg"} alt={player.name} className="object-cover w-full h-full" />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold">{player.name}</h3>
          <p className="text-sm text-muted-foreground">
            {player.position} • {calculateAge(player.birthdate)} ans
          </p>
        </div>

        <div className="flex gap-2">
          <Link href={`/dashboard/players/${player.id}/trophies`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Trophy className="h-4 w-4 mr-2" />
              Trophées
            </Button>
          </Link>
          <Link href={`/dashboard/players/${player.id}/training`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Dumbbell className="h-4 w-4 mr-2" />
              Entraînement
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
