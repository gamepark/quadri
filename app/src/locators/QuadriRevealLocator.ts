import { Locator } from '@gamepark/react-game'
import { getEdgeOrigin, toEdgeCoords } from './edgeOrigin'

const ABS = { x: -30, y: 5 }

class QuadriRevealLocator extends Locator {
  locationOrigin = getEdgeOrigin(ABS.x, ABS.y)
  getLocationCoordinates() { return toEdgeCoords(ABS.x, ABS.y) }
}

export const quadriRevealLocator = new QuadriRevealLocator()
