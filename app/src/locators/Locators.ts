import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { PlayerColor } from '@gamepark/quadri/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { objectiveDeckLocator } from './ObjectiveDeckLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { quadriDeckLocator } from './QuadriDeckLocator'
import { scoredObjectivesLocator } from './ScoredObjectivesLocator'
import { tableLocator } from './TableLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.QuadriDeck]: quadriDeckLocator,
  [LocationType.ObjectiveDeck]: objectiveDeckLocator,
  [LocationType.Table]: tableLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.ScoredObjectives]: scoredObjectivesLocator,
}
