export async function listPlaces(visited: Boolean = true): Promise<any> {
  const url =
    "https://api.airtable.com/v0/appUtaNDGxbz3kGSO/michelin_restaurants"

  const { AIRTABLE_PAT } = import.meta.env
  const params = {
    maxRecords: 100,
    view: "Grid view",
    filterByFormula: visited ? "Visited" : "NOT(Visited)",
  }

  const airtableUrl = new URL(url)
  Object.entries(params).forEach(([key, value]) =>
    airtableUrl.searchParams.append(key, String(value))
  )

  const response = await fetch(airtableUrl, {
    headers: { Authorization: `Bearer ${AIRTABLE_PAT}` },
  })
  const data = await response.json()
  const places = data ? data.records : null

  return places
}
