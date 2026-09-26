import { counting, group } from "radash"
import { listPlaces } from "../../utils/places"
import { michelinStats } from "../../utils/michelin-stats"
import type { Place } from "../components/common/Types"

export interface Bar {
  label: string
  value: number
}

export interface CountryCoverage {
  country: string
  rows: { stars: 1 | 2 | 3; visited: number; total: number }[]
}

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0)
const year = (p: Place) => p.fields.Date.split("-")[0]

function toBars(record: Record<string, number>, sortBy: "label" | "value"): Bar[] {
  const bars = Object.entries(record).map(([label, value]) => ({ label, value }))
  return sortBy === "value"
    ? bars.sort((a, b) => b.value - a.value)
    : bars.sort((a, b) => a.label.localeCompare(b.label))
}

export async function indexData() {
  const visited = await listPlaces()
  const upcoming = await listPlaces(false)
  const byStars = counting(visited, (p) => String(p.fields.Stars))
  const countries = new Set(visited.map((p) => p.fields.Country))
  const years = visited.map(year)

  return {
    visited: [...visited].reverse(),
    upcoming,
    starCounts: [1, 2, 3].map((s) => byStars[String(s)] ?? 0),
    totalStars: sum(visited.map((p) => p.fields.Stars)),
    countryCount: countries.size,
    firstYear: years[0],
    lastYear: years[years.length - 1],
  }
}

export async function statsData() {
  const places = await listPlaces()
  const totalStars = sum(places.map((p) => p.fields.Stars))
  const spentPerPerson = sum(places.map((p) => p.fields.Price + p.fields.PriceWinePairing))

  const starsByYear: Record<string, number> = {}
  for (const p of places) starsByYear[year(p)] = (starsByYear[year(p)] ?? 0) + p.fields.Stars

  const countryNames = [...new Set(places.map((p) => p.fields.Country))]
  const totals = await michelinStats(countryNames)
  const visitedByCountry = group(places, (p) => p.fields.Country)
  const coverage: CountryCoverage[] = totals.map((entry) => {
    const country = Object.keys(entry)[0]
    const visitedCounts = counting(visitedByCountry[country] ?? [], (p) => String(p.fields.Stars))
    const rows = ([3, 2, 1] as const)
      .filter((s) => (entry[country][String(s) as "1" | "2" | "3"] ?? 0) > 0)
      .map((s) => ({
        stars: s,
        visited: visitedCounts[String(s)] ?? 0,
        total: entry[country][String(s) as "1" | "2" | "3"] ?? 0,
      }))
    return { country, rows }
  })

  return {
    places,
    totalStars,
    spentPerPerson,
    averageBill: Math.round((spentPerPerson * 2) / places.length),
    restaurantCount: places.length,
    byCountry: toBars(counting(places, (p) => p.fields.Country), "value"),
    byYear: toBars(counting(places, year), "label"),
    starsByYear: toBars(starsByYear, "label"),
    byRating: toBars(counting(places, (p) => p.fields.GoogleRating.toFixed(1)), "label").reverse(),
    coverage,
    table: places.map((p) => ({
      name: p.fields.Name,
      stars: p.fields.Stars,
      food: p.fields.Food,
      wine: p.fields.WinePairing,
      rating: p.fields.GoogleRating,
      country: p.fields.Country,
      city: p.fields.Location,
      date: p.fields.Date,
      spent: p.fields.Price + p.fields.PriceWinePairing,
    })),
  }
}
