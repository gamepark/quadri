import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { coopObjectiveLocator } from './CoopObjectiveLocator'
import { objectiveDeckLocator } from './ObjectiveDeckLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { quadriDeckLocator } from './QuadriDeckLocator'
import { quadriRevealLocator } from './QuadriRevealLocator'
import { scoredObjectivesLocator } from './ScoredObjectivesLocator'
import { tableLocator } from './TableLocator'

export const Locators: Partial<Record<LocationType, Locator<number, MaterialType, LocationType>>> = {
  [LocationType.QuadriDeck]: quadriDeckLocator,
  [LocationType.ObjectiveDeck]: objectiveDeckLocator,
  [LocationType.Table]: tableLocator,
  [LocationType.QuadriReveal]: quadriRevealLocator,
  [LocationType.QuadriPending]: tableLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.ScoredObjectives]: scoredObjectivesLocator,
  [LocationType.CoopObjective]: coopObjectiveLocator,
}
