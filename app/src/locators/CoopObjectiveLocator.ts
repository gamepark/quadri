import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { columnOrigin, coopObjectiveCenter } from './layout'

/** The 10 shared cooperative objectives, laid out in 2 columns of 5, next to the player panels. */
class CoopObjectiveLocator extends Locator {
  locationOrigin = columnOrigin

  getCoordinates(location: Location, context: MaterialContext) {
    return coopObjectiveCenter(location.x ?? 0, context.rules.players.length)
  }
}

export const coopObjectiveLocator = new CoopObjectiveLocator()
