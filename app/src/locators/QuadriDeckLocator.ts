import { css } from '@emotion/react'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { DeckLocator, LocationDescription } from '@gamepark/react-game'
import { quadriCardDescription } from '../material/QuadriCardDescription.tsx'
import { createStackSpotCounter } from './component/StackSpotCounter.tsx'
import { getEdgeOrigin, toEdgeCoords } from './edgeOrigin'

const ABS = { x: -40, y: 5 }

class QuadriDeckLocator extends DeckLocator {
  locationOrigin = getEdgeOrigin(ABS.x, ABS.y)
  getCoordinates() { return toEdgeCoords(ABS.x, ABS.y) }
  navigationSorts = []
  location = {}
  locationDescription = new QuadriDeckDescription(quadriCardDescription)
}

class QuadriDeckDescription extends LocationDescription {
  content = createStackSpotCounter(MaterialType.QuadriCard, LocationType.QuadriDeck)

  extraCss = css`
    position: relative;

    > span {
      position: absolute;
      bottom: -1.5em;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.75em;
      font-weight: bolder;
      color: white;
      opacity: 0.7;
      text-shadow:
        3px 3px 0 #000,
        -3px 3px 0 #000,
        -3px -3px 0 #000,
        3px -3px 0 #000;
    }
  `
}

export const quadriDeckLocator = new QuadriDeckLocator()
