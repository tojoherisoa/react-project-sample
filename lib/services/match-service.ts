import type { Match } from "@/lib/types"

const mockMatches: Match[] = [
  {
    id: "1",
    opponent: "FC Lyon",
    date: "2025-11-15T15:00:00",
    location: "Domicile",
  },
  {
    id: "2",
    opponent: "AS Marseille",
    date: "2025-11-22T20:00:00",
    location: "Extérieur",
  },
  {
    id: "3",
    opponent: "Paris FC",
    date: "2025-11-29T17:00:00",
    location: "Domicile",
  },
  {
    id: "4",
    opponent: "Toulouse FC",
    date: "2025-12-06T15:00:00",
    location: "Extérieur",
  },
  {
    id: "5",
    opponent: "OGC Nice",
    date: "2025-12-13T19:00:00",
    location: "Domicile",
  },
  {
    id: "6",
    opponent: "RC Lens",
    date: "2025-12-20T21:00:00",
    location: "Extérieur",
  },
]

export async function getMatches(): Promise<Match[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockMatches
}
