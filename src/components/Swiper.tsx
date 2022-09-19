import LightGallery from 'lightgallery/react/Lightgallery.umd.js';
import 'lightgallery/css/lightgallery.css';
import { useCallback } from 'react';
import type { Photo } from './common/Types';

interface Props {
  photos: Photo[]
  licenseKey: string
}

export function Swiper ({ photos, licenseKey}:Props) {
  function renderClass(i: number) {
    if (i === 0) {return 'object-cover w-full rounded shadow-lg h-56 col-span-2 cursor-pointer duration-500 hover:scale-105'} else
    if (i < 3) {return 'object-cover w-full rounded shadow-lg h-48 cursor-pointer duration-500 hover:scale-105'} else 
    return 'hidden'
  }


  const getItems = useCallback(() => {
    return photos.map((item, index) => {
        return (
          <img className={renderClass(index)} src={index < 3 ? item.thumbnails.large.url : ""} alt={item.filename} data-src={item.url} key={item.id}/>
        );
    });
  }, [photos]);

  return (
    <>
      <LightGallery
        speed={500}
        download={false}
        elementClassNames="grid grid-cols-2 gap-5"
        licenseKey={licenseKey}
      >
        {getItems()}
      </LightGallery>
    </>
  )
}
