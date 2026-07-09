import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { columnOrigin, coopRealisedCenter } from './layout'

/** Shared pile of realised cooperative objectives, to the right of the objectives grid. */
class CoopRealisedObjectivesLocator extends DeckLocator {
  locationOrigin = columnOrigin

  getCoordinates(_location: object, context: MaterialContext) {
    return coopRealisedCenter(context.rules.players.length)
  }
}

export const coopRealisedObjectivesLocator = new CoopRealisedObjectivesLocator()
