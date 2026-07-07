import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { ObjectiveCard } from '../material/ObjectiveCard'
import { objectivePatterns } from '../material/ObjectiveCardPattern'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { buildColorMap } from './colorMap'
import { Memory } from './Memory'
import { isObjectiveRealized } from './objectiveCheck'
import { RuleId } from './RuleId'

/**
 * Automatic rule: after each Quadri card is placed, every realised objective (of
 * any player) is scored automatically and replaced by a fresh draw. No player
 * interaction. Scoring is re-checked after the draws (a freshly drawn objective
 * may already be realised) until nothing more can be scored, then the turn passes
 * to the next player (or the game ends).
 */
export class CheckObjectivesRule extends PlayerTurnRule<number, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const colorMap = buildColorMap(this.material(MaterialType.QuadriCard).location(LocationType.Table).getItems())
    const scoreMoves: MaterialMove<number, MaterialType, LocationType, RuleId>[] = []
    for (const player of this.game.players) {
      const hand = this.material(MaterialType.ObjectiveCard).location(LocationType.PlayerHand).player(player)
      for (const item of hand.getItems()) {
        if (isObjectiveRealized(objectivePatterns[item.id as ObjectiveCard], colorMap)) {
          scoreMoves.push(hand.id(item.id).moveItem({ type: LocationType.ScoredObjectives, player }))
        }
      }
    }

    // Score realised objectives (draws happen in afterItemMove), then re-check for
    // objectives that may have been drawn into hand and are already realised.
    if (scoreMoves.length > 0) {
      return [...scoreMoves, this.startRule(RuleId.CheckObjectives)]
    }

    return this.endOrNextTurn()
  }

  afterItemMove(move: ItemMove<number, MaterialType, LocationType>): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    if (isMoveItem(move) && move.itemType === MaterialType.ObjectiveCard && move.location.type === LocationType.ScoredObjectives) {
      const player = move.location.player!
      const deck = this.material(MaterialType.ObjectiveCard).location(LocationType.ObjectiveDeck)
      if (deck.length > 0) {
        // Always keep 3 objectives in hand.
        return [deck.deck().moveItem({ type: LocationType.PlayerHand, player })]
      }
    }
    return []
  }

  private endOrNextTurn(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const lastPlayer = this.remind<number | undefined>(Memory.LastPlayer)
    const nextPlayer = this.nextPlayer

    if (lastPlayer !== undefined && nextPlayer === lastPlayer) {
      return [this.endGame()]
    }

    if (lastPlayer === undefined) {
      const deck = this.material(MaterialType.ObjectiveCard).location(LocationType.ObjectiveDeck)
      if (deck.length === 0) {
        this.memorize(Memory.LastPlayer, nextPlayer)
      }
    }

    return [this.startPlayerTurn(RuleId.PlaceQuadriCard, nextPlayer)]
  }
}
