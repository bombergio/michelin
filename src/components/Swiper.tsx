import LightGallery from 'lightgallery/react/Lightgallery.umd.js'
import 'lightgallery/css/lightgallery.css'
import { useCallback } from 'react'
import type { Photo } from './common/Types'

interface Props {
  photos: Photo[]
}

export function Swiper ({ photos}:Props) {
  const { PUBLIC_LIGHTGALLERY_LICENSE_KEY } = import.meta.env

  function renderClass(i: number) {
    if (i === 0) {return 'object-cover w-full rounded shadow-lg h-56 col-span-2 cursor-pointer duration-500 hover:scale-105 lazy'} else
    if (i < 3) {return 'object-cover w-full rounded shadow-lg h-48 cursor-pointer duration-500 hover:scale-105 lazy'} else 
    return 'hidden'
  }

  const getItems = useCallback(() => {
    return photos.map((item, index) => {
        return (
          <img className={renderClass(index)} src={index < 3 ? item.thumbnails.large.url : ""} alt={item.filename} data-src={item.url} key={item.id} loading="lazy"/>
        );
    });
  }, [photos]);

  return (
    <>
      <LightGallery
        speed={500}
        download={false}
        elementClassNames="grid grid-cols-2 gap-5"
        licenseKey={{ key: PUBLIC_LIGHTGALLERY_LICENSE_KEY }}
      >
        {getItems()}
      </LightGallery>
    </>
  )
}
