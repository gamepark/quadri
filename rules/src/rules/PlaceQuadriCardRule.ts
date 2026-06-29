import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlaceQuadriCardRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId> {
  getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    // TODO: compute valid placements (positions covering 1-3 squares of existing cards)
    return []
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (isMoveItem(move) && move.location.type === LocationType.Table) {
      return [this.startPlayerTurn(RuleId.PlaceQuadriCard, this.nextPlayer)]
    }
    return []
  }
}
