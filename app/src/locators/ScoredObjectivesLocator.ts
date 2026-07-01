import { MaterialContext, DeckLocator } from '@gamepark/react-game'
import { Location, LocationType } from '@gamepark/rules-api'
import { getEdgeOrigin, toEdgeCoords } from './edgeOrigin'
import { playerHandLocator } from './PlayerHandLocator'

class ScoredObjectivesLocator extends DeckLocator {

  getCoordinates(location: Location, context: MaterialContext) {
    const abs = playerHandLocator.getAbsoluteCoordinates(location, context)
    return toEdgeCoords(abs.x - 15, abs.y)
  }

  getLocationOrigin(location: Location<number, LocationType>, context: MaterialContext) {
    const abs = playerHandLocator.getAbsoluteCoordinates(location, context)
    return getEdgeOrigin(abs.x - 15, abs.y)
  }
}

export const scoredObjectivesLocator = new ScoredObjectivesLocator()
