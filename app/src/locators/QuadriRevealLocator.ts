import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class QuadriRevealLocator extends Locator {
  getLocationCoordinates(_location: Location, _context: MaterialContext) {
    return { x: -30, y: 5 }
  }
}

export const quadriRevealLocator = new QuadriRevealLocator()
