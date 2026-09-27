export interface Place {
  id: string
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
  FullAddress: string
  Visited: boolean
  Images: number
  Id: number
}
