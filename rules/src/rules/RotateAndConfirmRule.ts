import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class RotateAndConfirmRule extends PlayerTurnRule<number, MaterialType, LocationType, RuleId> {
  getPlayerMoves(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const pendingCard = this.material(MaterialType.QuadriCard).location(LocationType.QuadriPending)
    if (pendingCard.length === 0) return []

    const item = pendingCard.getItem()!
    const currentRotation = (item.location.rotation ?? 0) as number

    return [
      pendingCard.rotateItem((currentRotation + 1) % 4),
      pendingCard.rotateItem((currentRotation + 3) % 4),
      this.customMove(CustomMoveType.ConfirmPlacement),
    ]
  }

  onCustomMove(move: CustomMove): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    if (move.type === CustomMoveType.ConfirmPlacement) {
      const pendingCard = this.material(MaterialType.QuadriCard).location(LocationType.QuadriPending)
      const item = pendingCard.getItem()!
      this.memorize(Memory.NextPlayer, this.nextPlayer)
      return [
        pendingCard.moveItem({ type: LocationType.Table, x: item.location.x, y: item.location.y, rotation: item.location.rotation }),
        this.startSimultaneousRule(RuleId.CheckObjectives),
      ]
    }
    return []
  }

}
