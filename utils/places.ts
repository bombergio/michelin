import { parse } from "csv-parse/sync"
import csvText from "../data/visited_restaurants.csv?raw"
import type { Place, Fields } from "../src/components/common/Types"

type CsvRow = Record<string, string>

const NUMERIC_RE = /-?\d+(\.\d+)?/

function toNumber(value: string | undefined): number {
  if (!value) return 0
  const match = NUMERIC_RE.exec(value.replaceAll(",", ""))
  return match ? Number(match[0]) : 0
}

function rowToPlace(row: CsvRow, index: number): Place {
  const fields: Fields = {
    Name: row.Name ?? "",
    Visited: row.Visited?.toLowerCase() === "checked",
    Stars: toNumber(row.Stars),
    Food: toNumber(row.Food),
    WinePairing: toNumber(row.WinePairing),
    Date: row.Date ?? "",
    Headline: row.Headline ?? "",
    Location: row.Location ?? "",
    Country: row.Country ?? "",
    Price: toNumber(row.Price),
    PriceWinePairing: toNumber(row.PriceWinePairing),
    Images: toNumber(row.Images),
    URL: row.URL ?? "",
    Lat: toNumber(row.Lat),
    Lon: toNumber(row.Lon),
    GoogleRating: toNumber(row.GoogleRating),
    FullAddress: row.FullAddress ?? "",
    Notes: row.Notes ?? "",
    Id: toNumber(row.Id),
  }

  return {
    id: String(fields.Id || index + 1),
    fields,
  }
}

let cache: Place[] | null = null

function loadAll(): Place[] {
  if (cache) return cache
  const rows: CsvRow[] = parse(csvText, {
    columns: true,
    bom: true,
    skip_empty_lines: true,
    trim: true,
  })
  cache = rows.map((row, index) => rowToPlace(row, index))
  return cache
}

export async function listPlaces(visited: boolean = true): Promise<Place[]> {
  return loadAll().filter((p) => p.fields.Visited === visited)
}
