export interface Place {
  id: string
  created_time: string
  fields: Fields
}

export interface Fields {
  Location: string
  Date: string
  Notes: string
  Headline: string
  Stars: number
  Price: number
  PriceWinePairing: number
  Name: string
  Country: string
  Food: number
  WinePairing: number
  URL: string
  Lat: number
  Lon: number
  GoogleRating: number
  LaListeRating: string
  FullAddress: string
  Visited: boolean
  Images: number
  Id: number
}

export interface TableFields {
  key: React.Key
  name: string
  stars: number
  googleRating: number
  country: string
  year: string
  food: number
  winePairing: number
}
