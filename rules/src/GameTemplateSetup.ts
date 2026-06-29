import { getEnumValues, MaterialGameSetup } from '@gamepark/rules-api'
import { shuffle } from 'es-toolkit/compat'
import { GameTemplateOptions } from './GameTemplateOptions'
import { GameTemplateRules } from './GameTemplateRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ObjectiveCard } from './material/ObjectiveCard'
import { QuadriCard } from './material/QuadriCard'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

export class GameTemplateSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, GameTemplateOptions> {
  Rules = GameTemplateRules

  setupMaterial(_options: GameTemplateOptions) {
    this.setupQuadriDeck()
    this.setupObjectiveDeck()
    this.placeInitialCard()
    this.dealObjectivesToPlayers()
  }

  setupQuadriDeck() {
    const cards = getEnumValues(QuadriCard).flatMap(type =>
      Array.from({ length: 8 }, () => ({ id: type, location: { type: LocationType.QuadriDeck } }))
    )
    this.material(MaterialType.QuadriCard).createItems(cards)
    this.material(MaterialType.QuadriCard).shuffle()
  }

  setupObjectiveDeck() {
    const objectives = shuffle(getEnumValues(ObjectiveCard)).slice(0, 30).map(id => ({
      id,
      location: { type: LocationType.ObjectiveDeck }
    }))
    this.material(MaterialType.ObjectiveCard).createItems(objectives)
    this.material(MaterialType.ObjectiveCard).shuffle()
  }

  placeInitialCard() {
    this.material(MaterialType.QuadriCard)
      .location(LocationType.QuadriDeck)
      .deck()
      .deal({ type: LocationType.Table }, 1)
  }

  dealObjectivesToPlayers() {
    for (const player of this.players) {
      this.material(MaterialType.ObjectiveCard)
        .location(LocationType.ObjectiveDeck)
        .deck()
        .deal({ type: LocationType.PlayerHand, player }, 3)
    }
  }

  start() {
    this.startPlayerTurn(RuleId.PlaceQuadriCard, this.players[0])
  }
}
