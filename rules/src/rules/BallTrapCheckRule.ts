import { isMoveItem, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { ObjectiveCard } from '../material/ObjectiveCard'
import { objectivePatterns } from '../material/ObjectiveCardPattern'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { buildColorMap } from './colorMap'
import { Memory } from './Memory'
import { isObjectiveRealized } from './objectiveCheck'
import { RuleId } from './RuleId'

export class BallTrapCheckRule extends SimultaneousRule<number, MaterialType, LocationType, RuleId> {
  // No onRuleStart: all players stay active to avoid hidden-id prediction mismatch.
  // Each player ends their own turn (either after eliminating or by passing).

  getActivePlayerLegalMoves(player: number): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const colorMap = buildColorMap(
      this.material(MaterialType.QuadriCard).location(LocationType.Table).getItems()
    )
    const moves: MaterialMove<number, MaterialType, LocationType, RuleId>[] = []
    for (const opponent of this.game.players.filter(p => p !== player)) {
      const hand = this.material(MaterialType.ObjectiveCard).location(LocationType.BallTrapHand).player(opponent)
      for (const item of hand.getItems()) {
        if (isObjectiveRealized(objectivePatterns[item.id as ObjectiveCard], colorMap)) {
          moves.push(hand.id(item.id).moveItem({ type: LocationType.BallTrapEliminatedObjectives, player }))
        }
      }
    }
    if (moves.length === 0) {
      return [this.endPlayerTurn(player)]
    }
    return moves
  }

  afterItemMove(move: ItemMove<number, MaterialType, LocationType>): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    if (!isMoveItem(move) || move.itemType !== MaterialType.ObjectiveCard) return []
    if (move.location.type !== LocationType.BallTrapEliminatedObjectives) return []

    const actingPlayer = move.location.player!
    const colorMap = buildColorMap(
      this.material(MaterialType.QuadriCard).location(LocationType.Table).getItems()
    )
    const canEliminate = this.game.players
      .filter(p => p !== actingPlayer)
      .some(opponent =>
        this.material(MaterialType.ObjectiveCard)
          .location(LocationType.BallTrapHand).player(opponent)
          .getItems()
          .some(item => isObjectiveRealized(objectivePatterns[item.id as ObjectiveCard], colorMap))
      )

    if (!canEliminate) {
      return [this.endPlayerTurn(actingPlayer)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const playersWithObjectives = this.game.players.filter(p =>
      this.material(MaterialType.ObjectiveCard).location(LocationType.BallTrapHand).player(p).length > 0
    )
    if (playersWithObjectives.length <= 1) return [this.endGame()]
    return [this.startPlayerTurn(RuleId.PlaceQuadriCard, this.remind<number>(Memory.NextPlayer))]
  }
}
