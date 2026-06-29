import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class ObjectiveDeckLocator extends DeckLocator {
  getCoordinates(_location: Location, _context: MaterialContext) {
    return { x: -40, y: -5 }
  }

  navigationSorts = []
}

export const objectiveDeckLocator = new ObjectiveDeckLocator()
