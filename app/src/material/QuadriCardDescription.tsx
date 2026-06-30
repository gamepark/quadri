import { css } from '@emotion/react'
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriCard } from '@gamepark/quadri/material/QuadriCard'
import { CardDescription, ItemContext, ItemMenuButton } from '@gamepark/react-game'
import { QuadriCardHelp } from './help/QuadriCardHelp'
import { isMoveItemType, MaterialItem, MaterialMove, MoveItem } from '@gamepark/rules-api'
import card1 from '../images/cartes_quadri/cartes_quadri_01.jpg'
import card2 from '../images/cartes_quadri/cartes_quadri_02.jpg'
import card3 from '../images/cartes_quadri/cartes_quadri_03.jpg'
import card4 from '../images/cartes_quadri/cartes_quadri_04.jpg'
import card5 from '../images/cartes_quadri/cartes_quadri_05.jpg'
import card6 from '../images/cartes_quadri/cartes_quadri_06.jpg'
import cardBack from '../images/cartes_quadri/cartes_quadri_dos.jpg'

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

  isMenuAlwaysVisible(item: MaterialItem): boolean {
    return item.location.type === LocationType.QuadriPending
  }

  getItemMenu(item: MaterialItem, _context: ItemContext, legalMoves: MaterialMove[]) {
    if (item.location.type !== LocationType.QuadriPending) return undefined

    const currentRotation = ((item.location.rotation as number) ?? 0)
    const rotateMoves = legalMoves.filter(isMoveItemType(MaterialType.QuadriCard)) as MoveItem[]
    const rotateLeft = rotateMoves.find(m => m.location.rotation === (currentRotation + 3) % 4)
    const rotateRight = rotateMoves.find(m => m.location.rotation === (currentRotation + 1) % 4)

    if (!rotateLeft && !rotateRight) return undefined

    return <>
      {rotateLeft && (
        <ItemMenuButton move={rotateLeft} x={-4.5} y={0} css={buttonCss}>
          <FontAwesomeIcon icon={faRotateLeft} />
        </ItemMenuButton>
      )}
      {rotateRight && (
        <ItemMenuButton move={rotateRight} x={4.5} y={0} css={buttonCss}>
          <FontAwesomeIcon icon={faRotateRight} />
        </ItemMenuButton>
      )}
    </>
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

export const quadriCardDescription = new QuadriCardDescription()
