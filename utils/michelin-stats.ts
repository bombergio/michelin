import { neon } from "@neondatabase/serverless"

interface CountryStars {
  [country: string]: {
    "1"?: number
    "2"?: number
    "3"?: number
  }
}
import { getCountryCode } from "countries-list"

export async function michelinStats(countries: string[]) {
  const sql = neon(process.env.DATABASE_URL as string)

  const results: CountryStars[] = []

  for (const country of countries) {
    const countryCode = getCountryCode(country)
    const res = await sql`
      SELECT distinction, COUNT(*) as count
      FROM "Restaurant"
      WHERE "countryCode" = LOWER(${countryCode}) AND distinction IN ('1 star', '2 star', '3 star') GROUP BY distinction;`

    const countryStars: CountryStars = {
      [country]: {},
    }
    res.forEach((row) => {
      const starCount: "1" | "2" | "3" = row.distinction.split(" ")[0] as
        | "1"
        | "2"
        | "3"
      countryStars[country][starCount] = parseInt(row.count, 10)
    })
    results.push(countryStars)
  }

  return results
}
