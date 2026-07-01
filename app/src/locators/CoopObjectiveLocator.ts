import { OriginType, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { toEdgeCoords } from './edgeOrigin'

// 10 coop objectives in a row near the top, centered horizontally
class CoopObjectiveLocator extends Locator {
  locationOrigin = { x: OriginType.Center, y: OriginType.Min }

  getCoordinates(location: Location) {
    const absX = (location.x ?? 0) * 8 - 36
    const absY = -25
    // x: offset from horizontal center (unchanged), y: offset from top edge
    const { y } = toEdgeCoords(absX, absY)
    return { x: absX, y }
  }
}

export const coopObjectiveLocator = new CoopObjectiveLocator()
