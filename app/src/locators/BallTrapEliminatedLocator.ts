import { DeckLocator } from '@gamepark/react-game'

class BallTrapEliminatedLocator extends DeckLocator {
  getCoordinates() {
    return { x: -40, y: -5 }
  }
}

export const ballTrapEliminatedLocator = new BallTrapEliminatedLocator()
