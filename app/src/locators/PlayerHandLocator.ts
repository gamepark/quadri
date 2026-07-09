import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { Location } from '@gamepark/rules-api'
import { columnOrigin, getMode, handCenterY, HAND_X } from './layout'

/**
 * A player's hand (competitive objectives, or ball-trap objectives) shown as a compact fan on the
 * player's row, just right of their panel. Used for both LocationType.PlayerHand and BallTrapHand.
 */
class PlayerHandLocator extends HandLocator {
  locationOrigin = columnOrigin
  radius = 60
  maxAngle = 12
  gapMaxAngle = 6
  baseAngle = 0

  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    return { x: HAND_X, y: handCenterY(index, context.rules.players.length, getMode(context.rules as QuadriRules)) }
  }
}

export const playerHandLocator = new PlayerHandLocator()
