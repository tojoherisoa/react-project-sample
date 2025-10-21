import type { Player, Trophy } from "@/lib/types"

// Mock data - simulates API calls
const mockPlayers: Player[] = [
  {
    id: "1",
    name: "Kylian Mbappé",
    position: "Attaquant",
    birthdate: "1998-03-15",
    imageUrl: "/mbappe.webp",
  },
  {
    id: "2",
    name: "Cristiano Ronaldo",
    position: "Attaquant",
    birthdate: "1996-09-25",
    imageUrl: "/cristiano.webp",
  },
  {
    id: "3",
    name: "Vinícius Júnior",
    position: "Attaquant",
    birthdate: "1997-11-08",
    imageUrl: "/vini.webp",
  },
  {
    id: "4",
    name: "Jude Bellingham",
    position: "Milieu",
    birthdate: "1999-05-30",
    imageUrl: "/bellingham.webp",
  },
  {
    id: "5",
    name: "João Félix",
    position: "Milieu",
    birthdate: "2000-01-12",
    imageUrl: "/felix.webp",
  },
  {
    id: "6",
    name: "Sadio Mané",
    position: "Milieu",
    birthdate: "1996-09-25",
    imageUrl: "/mane.webp",
  },
]

const mockTrophies: Trophy[] = [
  { id: "1", playerId: "1", name: "Coupe de France", year: 2023 },
  { id: "2", playerId: "1", name: "Meilleur buteur", year: 2022 },
  { id: "3", playerId: "2", name: "Gant d'or", year: 2023 },
  { id: "4", playerId: "3", name: "Championnat National", year: 2021 },
  { id: "5", playerId: "4", name: "Joueur du mois", year: 2023 },
]

export async function getPlayers(): Promise<Player[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockPlayers
}

export async function getPlayerById(id: string): Promise<Player | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockPlayers.find((p) => p.id === id) || null
}

export async function getTrophiesForPlayer(playerId: string): Promise<Trophy[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockTrophies.filter((t) => t.playerId === playerId)
}
