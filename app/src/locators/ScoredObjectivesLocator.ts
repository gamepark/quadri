import { DeckLocator, getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { columnOrigin, scoredCenterY, SCORED_X } from './layout'

/** A player's personal pile of scored objectives (competitive), tucked under their panel. */
class ScoredObjectivesLocator extends DeckLocator {
  locationOrigin = columnOrigin

  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    return { x: SCORED_X, y: scoredCenterY(index, context.rules.players.length) }
  }
}

export const scoredObjectivesLocator = new ScoredObjectivesLocator()
