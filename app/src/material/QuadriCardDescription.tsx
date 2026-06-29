import { css } from '@emotion/react'
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriCard } from '@gamepark/quadri/material/QuadriCard'
import { CardDescription, ItemContext, ItemMenuButton } from '@gamepark/react-game'
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
  border-radius: 50%;
  font-size: 1.3em;
`

export const quadriCardDescription = new QuadriCardDescription()
