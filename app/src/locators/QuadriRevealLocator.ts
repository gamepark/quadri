import { Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { getEdgeOrigin, toEdgeCoords } from './edgeOrigin'

const ABS = { x: -30, y: 5 }

class QuadriRevealLocator extends Locator {
  locationOrigin = getEdgeOrigin(ABS.x, ABS.y)
  getLocationCoordinates() { return toEdgeCoords(ABS.x, ABS.y) }

  // Show the local pre-placement rotation applied to the revealed card.
  getItemRotateZ(item: MaterialItem) {
    return (item.location.rotation as number ?? 0) * 90
  }
}

export const quadriRevealLocator = new QuadriRevealLocator()
