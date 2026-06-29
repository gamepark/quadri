import { QuadriCard } from '@gamepark/quadri/material/QuadriCard'
import { CardDescription } from '@gamepark/react-game'
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
}

export const quadriCardDescription = new QuadriCardDescription()
