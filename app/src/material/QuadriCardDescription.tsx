import { css } from '@emotion/react'
import { faCheck, faRotateLeft, faRotateRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriCard } from '@gamepark/quadri/material/QuadriCard'
import { Memory } from '@gamepark/quadri/rules/Memory'
import { CardDescription, ItemContext, ItemMenuButton, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import card1 from '../images/cartes_quadri/cartes_quadri_01.jpg'
import card2 from '../images/cartes_quadri/cartes_quadri_02.jpg'
import card3 from '../images/cartes_quadri/cartes_quadri_03.jpg'
import card4 from '../images/cartes_quadri/cartes_quadri_04.jpg'
import card5 from '../images/cartes_quadri/cartes_quadri_05.jpg'
import card6 from '../images/cartes_quadri/cartes_quadri_06.jpg'
import cardBack from '../images/cartes_quadri/cartes_quadri_dos.jpg'
import { QuadriCardHelp } from './help/QuadriCardHelp'

// Tutorial step index (0-based, in Tutorial.tsx) at which the player places their first tile.
// Up to and including it, that tile must not be rotated (magenta diagonal objective).
const TUTORIAL_FIRST_PLACEMENT_STEP = 4

class QuadriCardDescription extends CardDescription {
  width = 7
  height = 7
  borderRadius = 0.3
  help = QuadriCardHelp

  images = {
    [QuadriCard.Card1]: card1,
    [QuadriCard.Card2]: card2,
    [QuadriCard.Card3]: card3,
    [QuadriCard.Card4]: card4,
    [QuadriCard.Card5]: card5,
    [QuadriCard.Card6]: card6,
  }

  backImage = cardBack

  // The card being previewed on the table shows its rotate/validate/cancel buttons permanently.
  private isPreviewedCard(item: MaterialItem, context: ItemContext): boolean {
    return item.location.type === LocationType.Table
      && context.rules.remind(Memory.QuadriPreview) === context.index
  }

  // The freshly revealed card, waiting to be placed, can be pre-rotated by the active player.
  private isRevealedForActivePlayer(item: MaterialItem, context: ItemContext): boolean {
    return item.location.type === LocationType.QuadriReveal
      && context.player !== undefined
      && context.player === context.rules.game.rule?.player
  }

  // In the tutorial, the very first Quadri tile must stay at rotation 0 so its magenta corner lands
  // on the diagonal (see Tutorial.tsx). Rotating it — even locally — would break the objective, so
  // its rotation controls are suppressed up to and including the first placement step.
  private isTutorialFirstPlacement(context: ItemContext): boolean {
    const step = context.rules.game.tutorial?.step
    return step !== undefined && step <= TUTORIAL_FIRST_PLACEMENT_STEP
  }

  isMenuAlwaysVisible(item: MaterialItem, context: ItemContext): boolean {
    // The revealed card only needs its always-on menu for the rotation buttons; skip it when those
    // are suppressed (tutorial first tile) so no empty menu is forced.
    return this.isPreviewedCard(item, context)
      || (this.isRevealedForActivePlayer(item, context) && !this.isTutorialFirstPlacement(context))
  }

  getItemMenu(item: MaterialItem, context: ItemContext) {
    const card = context.rules.material(MaterialType.QuadriCard).index(context.index)
    // Rotations are local moves: they only update this player's view, never the game history.
    const rotateLeft = card.moveItem(it => ({ ...it.location, rotation: (((it.location.rotation ?? 0) as number) + 3) % 4 }))
    const rotateRight = card.moveItem(it => ({ ...it.location, rotation: (((it.location.rotation ?? 0) as number) + 1) % 4 }))

    // Rotation is forbidden on the tutorial's first tile: don't offer its rotate buttons at all.
    const rotationButtons = this.isTutorialFirstPlacement(context) ? null : <>
      <ItemMenuButton move={rotateLeft} options={{ local: true }} x={-4.5} y={0} css={buttonCss}>
        <FontAwesomeIcon icon={faRotateLeft} />
      </ItemMenuButton>
      <ItemMenuButton move={rotateRight} options={{ local: true }} x={4.5} y={0} css={buttonCss}>
        <FontAwesomeIcon icon={faRotateRight} />
      </ItemMenuButton>
    </>

    // Before placement: only the rotation buttons on the revealed card (none during the first tuto tile).
    if (this.isRevealedForActivePlayer(item, context)) {
      return rotationButtons ?? undefined
    }

    if (this.isPreviewedCard(item, context)) {
      const cancel = card.moveItem(it => ({ type: LocationType.QuadriReveal, rotation: it.location.rotation }))
      // Validation is a real move to the card's current (previewed) location: the only move sent to the server.
      const validate = card.moveItem(it => it.location)
      return <>
        {rotationButtons}
        <ItemMenuButton move={cancel} options={{ local: true }} x={0} y={-4.5} css={cancelCss}>
          <FontAwesomeIcon icon={faXmark} />
        </ItemMenuButton>
        <ItemMenuButton move={validate} x={0} y={4.5} css={confirmCss}>
          <FontAwesomeIcon icon={faCheck} />
        </ItemMenuButton>
      </>
    }

    return undefined
  }

  isFlippedOnTable(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    return item.location?.type === LocationType.QuadriDeck || super.isFlippedOnTable(item, context)
  }
}

const buttonCss = css`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50% !important;
  font-size: 1.3em;
  background-color: rgba(8, 8, 15, 0.88) !important;
  color: #00C8E0 !important;
  border: 0.1em solid #00C8E0 !important;
  box-shadow: 0 0 0.5em rgba(0, 200, 224, 0.35) !important;
  transition: background-color 120ms ease, box-shadow 120ms ease !important;

  &:hover {
    background-color: #00C8E0 !important;
    color: #08080F !important;
    box-shadow: 0 0 0.9em rgba(0, 229, 255, 0.55) !important;
  }
`

const confirmCss = css`
  ${buttonCss};
  color: #34d058 !important;
  border-color: #34d058 !important;
  box-shadow: 0 0 0.5em rgba(52, 208, 88, 0.35) !important;

  &:hover {
    background-color: #34d058 !important;
    color: #08080F !important;
    box-shadow: 0 0 0.9em rgba(52, 208, 88, 0.55) !important;
  }
`

const cancelCss = css`
  ${buttonCss};
  color: #ff5c5c !important;
  border-color: #ff5c5c !important;
  box-shadow: 0 0 0.5em rgba(255, 92, 92, 0.35) !important;

  &:hover {
    background-color: #ff5c5c !important;
    color: #08080F !important;
    box-shadow: 0 0 0.9em rgba(255, 92, 92, 0.55) !important;
  }
`

export const quadriCardDescription = new QuadriCardDescription()
