import mapboxgl from 'mapbox-gl'
import type { Place } from '../common/Types'
import { useEffect } from 'react'
import slug from 'slug'
import { starsToIcon } from '../../components/common/Helpers'

mapboxgl.accessToken = import.meta.env.PUBLIC_MAPKEY_TOKEN

export default function Mapbox({places}: {places: Place[]}){
  const lons: number[] = places.map(r => r.fields.Lon)
  const lats: number[] = places.map(r => r.fields.Lat)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      bounds: [Math.min(...lons)-2, Math.min(...lats), Math.max(...lons)+2, Math.max(...lats)]
    })

    map.scrollZoom.disable()

    places.forEach((place: Place) => {
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnMove: true,
        maxWidth: 'auto'
      }).setHTML(
        `
          <h2 style="font-size: 20px; padding-top: 10px; padding-bottom: 10px; text-decoration: underline;">
            <a style="outline:none;" href="/#${slug(place.fields.Name)}">${place.fields.Name}</a>
          </h2>
          <img src=${starsToIcon(place.fields.Stars)} alt="Michelin stars" style="height: 20px;"/>
        `
      )

      new mapboxgl.Marker({
        color: "#C22B33"
      }).setLngLat([place.fields.Lon, place.fields.Lat])
        .setPopup(popup)
        .addTo(map)
    })
  })
}
