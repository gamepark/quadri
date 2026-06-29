import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
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
