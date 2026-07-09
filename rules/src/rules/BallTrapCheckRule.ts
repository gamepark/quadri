import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { ObjectiveCard } from '../material/ObjectiveCard'
import { objectivePatterns } from '../material/ObjectiveCardPattern'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { buildColorMap } from './colorMap'
import { isObjectiveRealized } from './objectiveCheck'
import { RuleId } from './RuleId'

/**
 * Automatic rule: after each Quadri card is placed, every objective realised on the
 * board is eliminated (moved out of its owner's hand). No player interaction.
 *
 * Design choice (kept intentionally): an objective is eliminated as soon as the board
 * realises it, regardless of who placed the triggering card. The rulebook says an
 * objective is realised "par un autre" (by another player), so strictly a player
 * completing their OWN objective on their own turn should not lose it. Since players
 * cannot see their own objectives (BallTrapHand is hidden from its owner), we treat any
 * realised objective as eliminated — simpler, and the edge case is marginal.
 *
 * Because eliminations read objective ids that are hidden from their owner, the
 * transition into this rule is marked unpredictable (see QuadriRules.isUnpredictableMove).
 */
export class BallTrapCheckRule extends PlayerTurnRule<number, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const colorMap = buildColorMap(this.material(MaterialType.QuadriCard).location(LocationType.Table).getItems())

    const eliminateMoves: MaterialMove<number, MaterialType, LocationType, RuleId>[] = []
    for (const player of this.game.players) {
      const hand = this.material(MaterialType.ObjectiveCard).location(LocationType.BallTrapHand).player(player)
      for (const item of hand.getItems()) {
        if (isObjectiveRealized(objectivePatterns[item.id as ObjectiveCard], colorMap)) {
          // Move to the single shared elimination pile (no owner) so every eliminated objective stays in
          // the same location area and the deck locator stacks them as one pile. Who eliminated it (for the
          // history log) is read from the active turn instead — see QuadriLogs / EliminateObjectiveLog.
          eliminateMoves.push(hand.id(item.id).moveItem({ type: LocationType.BallTrapEliminatedObjectives }))
        }
      }
    }

    // Re-enter the rule after applying the eliminations so the end/next-turn decision
    // is taken on the updated hands (no objectives are drawn, so a single pass suffices).
    if (eliminateMoves.length > 0) {
      return [...eliminateMoves, this.startRule(RuleId.BallTrapCheckObjectives)]
    }

    return this.endOrNextTurn()
  }

  private endOrNextTurn(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const playersWithObjectives = this.game.players.filter(p =>
      this.material(MaterialType.ObjectiveCard).location(LocationType.BallTrapHand).player(p).length > 0
    )
    if (playersWithObjectives.length <= 1) return [this.endGame()]
    return [this.startPlayerTurn(RuleId.PlaceQuadriCard, this.nextPlayer)]
  }
}
