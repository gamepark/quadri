import { css } from '@emotion/react'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { DeckLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { objectiveCardDescription } from '../material/ObjectiveCardDescription'
import { createStackSpotCounter } from './component/StackSpotCounter.tsx'
import { columnOrigin, objectiveDeckCenter } from './layout'

/** Competitive shared objective draw pile, under the panels (below the scored piles). */
class ObjectiveDeckLocator extends DeckLocator {
  locationOrigin = columnOrigin
  navigationSorts = []
  location = {}
  locationDescription = new ObjectiveDeckDescription(objectiveCardDescription)

  getCoordinates(_location: object, context: MaterialContext) {
    return objectiveDeckCenter(context.rules.players.length)
  }
}

class ObjectiveDeckDescription extends LocationDescription {
  content = createStackSpotCounter(MaterialType.ObjectiveCard, LocationType.ObjectiveDeck)

  extraCss = css`
    position: relative;
  `
}

export const objectiveDeckLocator = new ObjectiveDeckLocator()
