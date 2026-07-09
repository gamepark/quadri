import { Locator, MaterialContext } from '@gamepark/react-game'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { columnOrigin, getMode, quadriRevealCenter } from './layout'

/** The freshly drawn Quadri card, waiting to be placed, shown next to the Quadri deck. */
class QuadriRevealLocator extends Locator {
  locationOrigin = columnOrigin

  getCoordinates(_location: Location, context: MaterialContext) {
    return quadriRevealCenter(context.rules.players.length, getMode(context.rules as QuadriRules))
  }

  // Show the local pre-placement rotation applied to the revealed card.
  getItemRotateZ(item: MaterialItem) {
    return (item.location.rotation as number ?? 0) * 90
  }
}

export const quadriRevealLocator = new QuadriRevealLocator()
