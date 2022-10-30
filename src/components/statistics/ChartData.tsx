import type { Place, Fields } from '../common/Types'
import { counting } from 'radash'

export interface chartDataParams {
  places: Place[]
  fieldKey?: keyof Fields;
  elementsArray?: string[] | number[];
}

export interface chartData {
  x: string
  y: number
}

export function ChartDataBy({places, fieldKey, elementsArray}: chartDataParams): chartData[] {
  return Array.from(
    Object.entries(
      counting(elementsArray ? elementsArray : (
        fieldKey != undefined ? places.map(r => r.fields[fieldKey]) : []), x => x)
    ).map(([ key, val ]) => ({ x: key, y: val }))
  )
}

export function GroupChartDataByYear(places: Place[]): chartData[]{
  const starAndYear: chartData[] = places.map(r => ({x: r.fields.Date.split('-')[0], y: r.fields.Stars}))
  return Object.values(
    starAndYear.reduce((a, c) => (
      a[c.x] = a[c.x] ?
      (a[c.x].y += c.y, a[c.x]) :
      c, a), {}
    )
  )
}
