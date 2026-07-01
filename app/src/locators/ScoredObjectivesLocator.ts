import { MaterialContext, DeckLocator } from '@gamepark/react-game'
import { Location, LocationType } from '@gamepark/rules-api'
import { getEdgeOrigin, toEdgeCoords } from './edgeOrigin'
import { playerHandLocator } from './PlayerHandLocator'

class ScoredObjectivesLocator extends DeckLocator {

  getCoordinates(location: Location, context: MaterialContext) {
    const pos = this.getScoredPosition(playerHandLocator.getAbsoluteCoordinates(location, context), context.rules.players.length)
    return toEdgeCoords(pos.x, pos.y)
  }

  getLocationOrigin(location: Location<number, LocationType>, context: MaterialContext) {
    const pos = this.getScoredPosition(playerHandLocator.getAbsoluteCoordinates(location, context), context.rules.players.length)
    return getEdgeOrigin(pos.x, pos.y)
  }

  private getScoredPosition(abs: { x: number; y: number }, playerCount: number) {
    if (playerCount === 2) {
      // Both players at bottom: push left (opponent at x=40 → scores at x=25)
      return { x: abs.x - 15, y: abs.y }
    }
    // 3-4P corner layout: push outward from table center
    return { x: abs.x + Math.sign(abs.x) * 15, y: abs.y }
  }
}

export const scoredObjectivesLocator = new ScoredObjectivesLocator()
