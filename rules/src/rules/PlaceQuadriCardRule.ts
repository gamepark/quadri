import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { GameMode } from '../QuadriOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { computeValidPositions } from './placement'

export class PlaceQuadriCardRule extends PlayerTurnRule<number, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const deck = this.material(MaterialType.QuadriCard).location(LocationType.QuadriDeck)
    if (deck.length === 0) {
      if (this.remind(Memory.Mode) === GameMode.Cooperative) this.memorize(Memory.CoopWon, false)
      return [this.endGame()]
    }
    return [deck.deck().moveItem({ type: LocationType.QuadriReveal })]
  }

  getPlayerMoves(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const revealedCard = this.material(MaterialType.QuadriCard).location(LocationType.QuadriReveal)
    if (revealedCard.length === 0) return []

    const tableCards = this.material(MaterialType.QuadriCard).location(LocationType.Table).getItems()
    const validPositions = computeValidPositions(tableCards)
    const z = tableCards.length

    return validPositions.map(({ x, y }) =>
      revealedCard.moveItem({ type: LocationType.QuadriPending, x, y, rotation: 0, z })
    )
  }

  afterItemMove(move: ItemMove<number, MaterialType, LocationType>): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    if (isMoveItem(move) && move.location.type === LocationType.QuadriPending) {
      return [this.startRule(RuleId.RotateAndConfirm)]
    }
    return []
  }
}
