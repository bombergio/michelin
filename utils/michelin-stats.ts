import { parse } from "csv-parse/sync"
import { counting, group } from "radash"
import fs from "node:fs/promises"

export async function michelinStats(countries: string[]) {
  const data = await fs.readFile("files/michelin.csv", "utf-8")

  const csv = parse(data, {
    columns: true,
    skip_empty_lines: true,
  })

  const keys_to_keep = ["Country", "Award"]

  const filtered_list = csv
    .map((element: { [x: string]: any }) =>
      Object.assign({}, ...keys_to_keep.map((key) => ({ [key]: element[key] })))
    )
    .map((key: { Country: string; Award: string }) => ({
      country: key.Country,
      stars: key.Award.split(" ").at(0),
    }))
    .filter((el: { country: string }) => countries.includes(el.country))

  const summed_list = Object.entries(
    group(filtered_list, (g: { country: string; stars: string }) => g.country)
  ).map(([x, y]) => {
    return { [x]: counting(y, (r: { country: string; stars: string }) => r.stars) }
  })

  return summed_list
}
