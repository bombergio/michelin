import LightGallery from "lightgallery/react/Lightgallery.umd.js"
import "lightgallery/css/lightgallery.css"
import { useCallback } from "react"

interface Props {
  images: number
  restaurantId: number
}

export function Swiper({ images, restaurantId }: Props) {
  const { PUBLIC_LIGHTGALLERY_LICENSE_KEY } = import.meta.env

  function img_attr(i: number): { class: string; tr: string } {
    if (i === 1) {
      return {
        class:
          "object-cover w-full rounded shadow-lg h-56 col-span-2 cursor-pointer duration-500 hover:scale-105 lazy",
        tr: "tr:w-800,h-400,c-maintain_ratio/",
      }
    } else if (i <= 3) {
      return {
        class:
          "object-cover w-full rounded shadow-lg h-48 cursor-pointer duration-500 hover:scale-105 lazy",
        tr: "tr:w-400,h-400/",
      }
    } else return { class: "hidden", tr: "" }
  }

  const getItems = useCallback(() => {
    const imgArr = Array.from({ length: images }, (_, i) => i + 1)
    return imgArr.map((item) => {
      return (
        <img
          className={img_attr(item).class}
          src={
            item <= 3
              ? "https://ik.imagekit.io/bomberg/" +
                restaurantId +
                "/" +
                img_attr(item).tr +
                item +
                ".jpeg"
              : ""
          }
          alt={"Image " + item}
          data-src={
            "https://ik.imagekit.io/bomberg/" +
            restaurantId +
            "/tr:q-50,w-1600/" +
            item +
            ".jpeg"
          }
          key={item}
          loading="lazy"
        />
      )
    })
  }, [images, restaurantId])

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
