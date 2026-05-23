/// <reference types="astro/client" />

declare module "lightgallery/react/Lightgallery.umd.js"

declare module "*.csv?raw" {
  const content: string
  export default content
}
