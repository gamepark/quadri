import { css } from '@emotion/react'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { DeckLocator, LocationDescription } from '@gamepark/react-game'
import { objectiveCardDescription } from '../material/ObjectiveCardDescription'
import { createStackSpotCounter } from './component/StackSpotCounter.tsx'
import { getEdgeOrigin, toEdgeCoords } from './edgeOrigin'

const ABS = { x: -40, y: -7 }

class ObjectiveDeckLocator extends DeckLocator {
  locationOrigin = getEdgeOrigin(ABS.x, ABS.y)
  getCoordinates() { return toEdgeCoords(ABS.x, ABS.y) }
  navigationSorts = []
  location = {}
  locationDescription = new ObjectiveDeckDescription(objectiveCardDescription)
}

class ObjectiveDeckDescription extends LocationDescription {
  content = createStackSpotCounter(MaterialType.ObjectiveCard, LocationType.ObjectiveDeck)

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

export const objectiveDeckLocator = new ObjectiveDeckLocator()
