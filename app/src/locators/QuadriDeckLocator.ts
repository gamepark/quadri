import { css } from '@emotion/react'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { DeckLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { quadriCardDescription } from '../material/QuadriCardDescription.tsx'
import { createStackSpotCounter } from './component/StackSpotCounter.tsx'
import { columnOrigin, getMode, quadriDeckCenter } from './layout'

class QuadriDeckLocator extends DeckLocator {
  locationOrigin = columnOrigin
  navigationSorts = []
  location = {}
  locationDescription = new QuadriDeckDescription(quadriCardDescription)

  getCoordinates(_location: object, context: MaterialContext) {
    return quadriDeckCenter(context.rules.players.length, getMode(context.rules as QuadriRules))
  }
}

class QuadriDeckDescription extends LocationDescription {
  content = createStackSpotCounter(MaterialType.QuadriCard, LocationType.QuadriDeck)

  extraCss = css`
    position: relative;
  `
}

export const quadriDeckLocator = new QuadriDeckLocator()
