export async function listPlaces(visited: Boolean = true): Promise<any> {
  const url = 'https://api.airtable.com/v0/appUtaNDGxbz3kGSO/michelin_restaurants'
  
  const { AIRTABLE_API_KEY } = import.meta.env
  const params = {
    maxRecords: 100,
    api_key: AIRTABLE_API_KEY,
    view: 'Grid view',
    filterByFormula: visited ? 'Visited' : 'NOT(Visited)'
  }

  const queryString = Object.keys(params).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&')
  const airtableUrl = url + '?' + queryString

  const response = await fetch(airtableUrl)
  const data = await response.json()
  const places = data ? data.records : null

  return places
}
