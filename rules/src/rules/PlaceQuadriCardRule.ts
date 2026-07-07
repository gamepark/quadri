import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { GameMode } from '../QuadriOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { computeValidPositions } from './placement'

export class PlaceQuadriCardRule extends PlayerTurnRule<number, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    this.forget(Memory.QuadriPreview)
    const deck = this.material(MaterialType.QuadriCard).location(LocationType.QuadriDeck)
    if (deck.length === 0) {
      // Deck exhausted: in coop this is a defeat (objectives remain), computed from state at scoring time.
      return [this.endGame()]
    }
    return [deck.deck().moveItem({ type: LocationType.QuadriReveal })]
  }

  getPlayerMoves(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    // The card to place is either freshly revealed or the one already previewed on the table.
    // Offering placements for the previewed card lets the player drag it to another spot without
    // cancelling first (all these moves stay local until validation — see previewMove).
    const preview = this.remind<number | undefined>(Memory.QuadriPreview)
    const cardToPlace = preview !== undefined
      ? this.material(MaterialType.QuadriCard).index(preview)
      : this.material(MaterialType.QuadriCard).location(LocationType.QuadriReveal)
    if (cardToPlace.length === 0) return []

    // Ignore the card being placed when computing valid spots, so a previewed card can be moved
    // freely and keeps the same z as the equivalent placement offered server-side.
    const tableCards = this.material(MaterialType.QuadriCard)
      .location(LocationType.Table)
      .filter((_, index) => index !== preview)
      .getItems()
    const validPositions = computeValidPositions(tableCards)
    const z = tableCards.length

    // Every (position × rotation) is a legal placement. The player previews one locally, rotates it
    // locally, then validates: the single validated move carries the chosen position and rotation.
    return validPositions.flatMap(({ x, y }) =>
      [0, 1, 2, 3].map(rotation =>
        cardToPlace.moveItem({ type: LocationType.Table, x, y, rotation, z })
      )
    )
  }

  afterItemMove(move: ItemMove<number, MaterialType, LocationType>, context?: PlayMoveContext): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    if (!isMoveItem(move) || move.itemType !== MaterialType.QuadriCard) return []

    // The player cancelled the preview: the card went back to its reveal spot.
    if (move.location.type === LocationType.QuadriReveal) {
      this.forget(Memory.QuadriPreview)
      return []
    }

    if (move.location.type === LocationType.Table) {
      if (context?.local) {
        // Placement/rotation preview: kept on the player's side only, never sent to the server.
        this.memorize(Memory.QuadriPreview, move.itemIndex)
        return []
      }
      // Validated placement: move on to the objective check for the current mode.
      this.forget(Memory.QuadriPreview)
      switch (this.remind<GameMode>(Memory.Mode)) {
        case GameMode.Cooperative:
          return [this.startRule(RuleId.CoopCheckObjectives)]
        case GameMode.BallTrap:
          return [this.startRule(RuleId.BallTrapCheckObjectives)]
        default:
          return [this.startRule(RuleId.CheckObjectives)]
      }
    }
    return []
  }
}
