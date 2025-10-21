export interface Player {
  id: string
  name: string
  position: "Gardien" | "Défenseur" | "Milieu" | "Attaquant"
  birthdate: string
  imageUrl: string
}

export interface Trophy {
  id: string
  playerId: string
  name: string
  year: number
}

export interface Match {
  id: string
  opponent: string
  date: string
  location: "Domicile" | "Extérieur"
}
