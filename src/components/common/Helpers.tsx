import oneStar from '../../images/oneStar.svg'
import twoStars from '../../images/twoStars.svg'
import threeStars from '../../images/threeStars.svg'

export function numberToCategory(number : Number) : Number {
  switch (true) {
    case (number <= 10):
      return 10
    case (number <= 50):
      return 50
    case (number <= 100):
      return 100
    case (number <= 200):
      return 200
    case (number <= 500):
      return 500
    default:
      return 1000
  }
}

export function starsToIcon(stars: number): string {
  switch (stars) {
    case 1:
      return oneStar
    case 2:
      return twoStars
    case 3:
      return threeStars
    default:
      return ''
  }
}

export function laListeBadge(rating: string): string {
  switch(true) {
    case (rating === 'outstanding'): {
      return `${outstandingBadge}`
    }
    case (Number(rating) > 0): {
      return `<div class="flex">${rating}${topBadge(numberToCategory(Number(rating)))}</div>`
    }
    default: {
      return rating
    }
  }
}

const outstandingBadge = `
  <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-7 h-7">
    <filter id="filter1" x="0" y="0" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
    <path id="Path" fill="#aab3be" fill-rule="evenodd" stroke="none" filter="url(#filter1)" d="M 300 150 C 300 67.157288 232.842712 0 150 0 C 67.157288 0 0 67.157288 0 150 C 0 232.842712 67.157288 300 150 300 C 232.842712 300 300 232.842712 300 150 Z"/>
    <text id="Top" xml:space="preserve">
      <tspan x="160" y="100" text-anchor="middle" font-family="Montserrat" font-size="60" font-weight="600" fill="#000000" xml:space="preserve">Out-</tspan>
      <tspan x="160" y="200" text-anchor="middle" font-family="Montserrat" font-size="60" font-weight="600" fill="#000000" xml:space="preserve">standing</tspan>
    </text>
  </svg>`

const topBadge = (topNumber : Number) => `
  <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-7 h-7 ml-2">
    <filter id="filter1" x="0" y="0" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
    <path id="Path" fill="#e2cb93" fill-rule="evenodd" stroke="none" filter="url(#filter1)" d="M 300 150 C 300 67.157288 232.842712 0 150 0 C 67.157288 0 0 67.157288 0 150 C 0 232.842712 67.157288 300 150 300 C 232.842712 300 300 232.842712 300 150 Z"/>
    <text id="Top" xml:space="preserve">
      <tspan x="168" y="120" text-anchor="middle" font-family="Montserrat" font-size="96" font-weight="700" fill="#000000" xml:space="preserve">Top</tspan>
      <tspan x="168" y="244.5" text-anchor="middle" font-family="Montserrat" font-size="96" font-weight="700" fill="#000000" xml:space="preserve">${topNumber}</tspan>
    </text>
  </svg>`
