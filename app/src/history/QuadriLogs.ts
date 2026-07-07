import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { CoopObjectiveLog } from './CoopObjectiveLog'
import { EliminateObjectiveLog } from './EliminateObjectiveLog'
import { PlaceCardLog } from './PlaceCardLog'
import { ScoreObjectiveLog } from './ScoreObjectiveLog'

export class QuadriLogs implements LogDescription<MaterialMove, number, MaterialGame> {
  getMovePlayedLogDescription(
    move: MaterialMove,
    context: MoveComponentContext<MaterialMove, number, MaterialGame>
  ): MovePlayedLogDescription | undefined {

    if (isMoveItemType(MaterialType.QuadriCard)(move) && move.location.type === LocationType.Table) {
      return { player: context.game.rule?.player, Component: PlaceCardLog }
    }

    if (isMoveItemType(MaterialType.ObjectiveCard)(move)) {
      if (move.location.type === LocationType.ScoredObjectives) {
        return { player: move.location.player, Component: ScoreObjectiveLog }
      }
      if (move.location.type === LocationType.BallTrapEliminatedObjectives) {
        return { player: move.location.player, Component: EliminateObjectiveLog }
      }
      if (move.location.type === LocationType.CoopRealisedObjectives) {
        return { Component: CoopObjectiveLog, depth: 1 }
      }
    }

    return undefined
  }
}
