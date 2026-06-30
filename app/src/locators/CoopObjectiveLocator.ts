import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class CoopObjectiveLocator extends Locator {
  getCoordinates(location: Location) {
    return {
      x: (location.x ?? 0) * 8 - 36,
      y: -25
    }
  }
}

export const coopObjectiveLocator = new CoopObjectiveLocator()
