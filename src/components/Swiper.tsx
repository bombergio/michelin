import LightGallery from 'lightgallery/react/Lightgallery.umd.js'
import 'lightgallery/css/lightgallery.css'
import { useCallback } from 'react'
import type { Photo } from './common/Types'

interface Props {
  photos: Photo[]
}

export function Swiper ({ photos}:Props) {
  const { PUBLIC_LIGHTGALLERY_LICENSE_KEY } = import.meta.env

  function img_attr(i: number): { class: string; tr: string } {
    if (i === 0) {return { class: 'object-cover w-full rounded shadow-lg h-56 col-span-2 cursor-pointer duration-500 hover:scale-105 lazy', tr: 'tr:w-0.99,h-400/' }} else
    if (i < 3) {return { class: 'object-cover w-full rounded shadow-lg h-48 cursor-pointer duration-500 hover:scale-105 lazy', tr: 'tr:w-400,h-400/'}} else 
    return { class: 'hidden', tr: '' }
  }

  const getItems = useCallback(() => {
    return photos.map((item, index) => {
      const filename=item.filename.replaceAll(" ", "_")
      return (
        <img className={img_attr(index).class} src={index < 3 ? "https://ik.imagekit.io/bomberg/" + img_attr(index).tr + filename : ""} alt={filename} data-src={"https://ik.imagekit.io/bomberg/" + filename} key={item.id} loading="lazy"/>
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

