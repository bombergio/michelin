import oneStar from "../../images/oneStar.svg"
import twoStars from "../../images/twoStars.svg"
import threeStars from "../../images/threeStars.svg"

export function starsToIcon(stars: number): string {
  switch (stars) {
    case 1:
      return oneStar.src
    case 2:
      return twoStars.src
    case 3:
      return threeStars.src
    default:
      return ""
  }
}
