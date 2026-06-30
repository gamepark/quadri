import { DeckLocator } from '@gamepark/react-game'

class CoopRealisedObjectivesLocator extends DeckLocator {
  getCoordinates() {
    return { x: -40, y: -5 }
  }
}

export const coopRealisedObjectivesLocator = new CoopRealisedObjectivesLocator()
