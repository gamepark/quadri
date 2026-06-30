import { DeckLocator } from '@gamepark/react-game'

class BallTrapEliminatedObjectivesLocator extends DeckLocator {
  getCoordinates() {
    return { x: -40, y: -5 }
  }
}

export const ballTrapEliminatedObjectivesLocator = new BallTrapEliminatedObjectivesLocator()
