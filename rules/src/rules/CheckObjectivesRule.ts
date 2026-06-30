import { isMoveItem, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { ObjectiveCard } from '../material/ObjectiveCard'
import { objectivePatterns } from '../material/ObjectiveCardPattern'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { buildColorMap } from './colorMap'
import { Memory } from './Memory'
import { isObjectiveRealized } from './objectiveCheck'
import { RuleId } from './RuleId'

export class CheckObjectivesRule extends SimultaneousRule<number, MaterialType, LocationType, RuleId> {

  onRuleStart(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const colorMap = buildColorMap(this.material(MaterialType.QuadriCard).location(LocationType.Table).getItems())
    const moves: MaterialMove<number, MaterialType, LocationType, RuleId>[] = []
    for (const player of this.game.players) {
      const hand = this.material(MaterialType.ObjectiveCard).location(LocationType.PlayerHand).player(player).getItems()
      const hasRealized = hand.some(item => isObjectiveRealized(objectivePatterns[item.id as ObjectiveCard], colorMap))
      if (!hasRealized) {
        moves.push(this.endPlayerTurn(player))
      }
    }
    return moves
  }

  getActivePlayerLegalMoves(player: number): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const colorMap = buildColorMap(this.material(MaterialType.QuadriCard).location(LocationType.Table).getItems())
    const hand = this.material(MaterialType.ObjectiveCard).location(LocationType.PlayerHand).player(player)
    const moves: MaterialMove<number, MaterialType, LocationType, RuleId>[] = []
    for (const item of hand.getItems()) {
      if (isObjectiveRealized(objectivePatterns[item.id as ObjectiveCard], colorMap)) {
        moves.push(hand.id(item.id).moveItem({ type: LocationType.ScoredObjectives, player }))
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove<number, MaterialType, LocationType>): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    if (!isMoveItem(move) || move.itemType !== MaterialType.ObjectiveCard) return []

    if (move.location.type === LocationType.ScoredObjectives) {
      const player = move.location.player!
      const deck = this.material(MaterialType.ObjectiveCard).location(LocationType.ObjectiveDeck)
      if (deck.length > 0) {
        return [deck.deck().moveItem({ type: LocationType.PlayerHand, player })]
      }
      return this.endIfDone(player)
    }

    if (move.location.type === LocationType.PlayerHand) {
      const player = move.location.player
      if (player === undefined) return []
      return this.endIfDone(player)
    }

    return []
  }

  private endIfDone(player: number): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const colorMap = buildColorMap(this.material(MaterialType.QuadriCard).location(LocationType.Table).getItems())
    const hand = this.material(MaterialType.ObjectiveCard).location(LocationType.PlayerHand).player(player).getItems()
    const hasRealized = hand.some(item => isObjectiveRealized(objectivePatterns[item.id as ObjectiveCard], colorMap))
    return hasRealized ? [] : [this.endPlayerTurn(player)]
  }

  getMovesAfterPlayersDone(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const lastPlayer = this.remind<number | undefined>(Memory.LastPlayer)
    const nextPlayer = this.remind<number>(Memory.NextPlayer)

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
