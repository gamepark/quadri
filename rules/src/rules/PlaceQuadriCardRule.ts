import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class PlaceQuadriCardRule extends PlayerTurnRule<number, MaterialType, LocationType, RuleId> {
  getPlayerMoves(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    // TODO: compute valid placements (positions covering 1-3 squares of existing cards)
    return []
  }

  afterItemMove(move: ItemMove<number, MaterialType, LocationType>): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    if (isMoveItem(move) && move.location.type === LocationType.Table) {
      return [this.startPlayerTurn(RuleId.PlaceQuadriCard, this.nextPlayer)]
    }
    return []
  }
}
