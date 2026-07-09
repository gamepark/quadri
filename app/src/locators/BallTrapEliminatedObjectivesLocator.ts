import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { columnOrigin, deckRowY, getMode, PILE_X } from './layout'

/** Shared pile of eliminated ball-trap objectives, at the bottom of the column. */
class BallTrapEliminatedObjectivesLocator extends DeckLocator {
  locationOrigin = columnOrigin

  getCoordinates(_location: object, context: MaterialContext) {
    return { x: PILE_X, y: deckRowY(context.rules.players.length, getMode(context.rules as QuadriRules)) }
  }
}

export const ballTrapEliminatedObjectivesLocator = new BallTrapEliminatedObjectivesLocator()
