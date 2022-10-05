import { parse } from 'csv-parse/sync'
import { counting } from 'radash'
import { group } from 'radash'

export async function michelinStats(countries: string[]) {

  const data = await fetch("https://raw.githubusercontent.com/ngshiheng/michelin-my-maps/main/data/michelin_my_maps.csv").then((response) => response.text())

  const csv = parse(data, {
    columns: true,
    skip_empty_lines: true
  })

  const keys_to_keep = ['Address', 'Award']

  const filtered_list = csv
    .map(element => Object.assign({}, ...keys_to_keep.map(key => ({[key]: element[key]}))))
    .filter(el => el.Award !== "Bib Gourmand")
    .map(key => ({ 
      country: (key.Address.split(",").at(-1).trim()),
      stars: (key.Award.split(" ").at(0))
    }))
    .filter(el => countries.includes(el.country))

  const summed_list = Object.entries(group(filtered_list, g => g.country)).map(([x, y]) => {
    return {[x]: counting(y, r => r.stars)}
  })
  return summed_list
}
