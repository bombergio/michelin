import GoogleMapReact from 'google-map-react'
import type { Place } from '../common/Types'
import oneStar from '../../images/oneStar.svg'
import twoStars from '../../images/twoStars.svg'
import threeStars from '../../images/threeStars.svg'

export default function Map({places}: {places: Place[]}){
  const lons: number[] = places.map(r => r.fields.Lon)
  const lats: number[] = places.map(r => r.fields.Lat)
  
  const { PUBLIC_GOOGLE_MAPS_API_KEY } = import.meta.env

  const defaultProps = {
    center: {
      lat: (Math.min(...lats) + Math.max(...lats))/2,
      lng: (Math.min(...lons) + Math.max(...lons))/2
    },
    zoom: 5
  };
  
  const icons: Record<number, { icon: string }> = {
    1: {icon: oneStar},
    2: {icon: twoStars},
    3: {icon: threeStars},
  };

  const getInfoWindowString = (place: Place) => `
    <div>
      <div style="font-size: 20px;">
        ${place.fields.Name}
      </div>
      <div>
        <img src=${icons[place.fields.Stars].icon} alt="Michelin stars" style="height: 20px;"/>
      </div>
    </div>`;

  const handleApiLoaded = (map: any, maps: any, places: Place[]) => {
    const markers: any[] = [];
    const infowindows: any[] = [];
  
    places.forEach((place: Place) => {
      markers.push(new maps.Marker({
        position: {
          lat: place.fields.Lat,
          lng: place.fields.Lon,
        },
        map,
      }));
  
      infowindows.push(new maps.InfoWindow({
        content: getInfoWindowString(place),
      }));
    });
  
    markers.forEach((marker, i) => {
      marker.addListener('click', () => {
        infowindows[i].open(map, marker);
      });
    });
  };

  return (
    <div style={{ height: '60vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{mapId: "2006d3a474b36a22"}}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
      />
    </div>
  );
}
