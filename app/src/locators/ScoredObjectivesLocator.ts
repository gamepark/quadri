import { MaterialContext, DeckLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerHandLocator } from './PlayerHandLocator.ts'

class ScoredObjectivesLocator extends DeckLocator {

  getCoordinates(location: Location, context: MaterialContext) {
    const playerHand = playerHandLocator.getCoordinates(location, context)
    return { x: playerHand.x - 15, y: playerHand.y }
  }
}

export const scoredObjectivesLocator = new ScoredObjectivesLocator()
