import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class QuadriDeckLocator extends DeckLocator {
  getCoordinates(_location: Location, _context: MaterialContext) {
    return { x: -40, y: 5 }
  }

  navigationSorts = []
}

export const quadriDeckLocator = new QuadriDeckLocator()
