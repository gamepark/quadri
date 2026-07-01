import { DeckLocator } from '@gamepark/react-game'
import { getEdgeOrigin, toEdgeCoords } from './edgeOrigin'

const ABS = { x: -40, y: 5 }

class QuadriDeckLocator extends DeckLocator {
  locationOrigin = getEdgeOrigin(ABS.x, ABS.y)
  getCoordinates() { return toEdgeCoords(ABS.x, ABS.y) }
  navigationSorts = []
}

export const quadriDeckLocator = new QuadriDeckLocator()
