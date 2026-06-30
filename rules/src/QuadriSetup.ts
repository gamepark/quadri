import { getEnumValues, MaterialGameSetup } from '@gamepark/rules-api'
import { shuffle } from 'es-toolkit/compat'
import { QuadriOptions } from './QuadriOptions'
import { QuadriRules } from './QuadriRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ObjectiveCard } from './material/ObjectiveCard'
import { objectiveValues } from './material/ObjectiveCardPattern'
import { QuadriCard } from './material/QuadriCard'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'

export class QuadriSetup extends MaterialGameSetup<number, MaterialType, LocationType, QuadriOptions> {
  Rules = QuadriRules

  setupMaterial(options: QuadriOptions) {
    if (options.cooperative) this.memorize(Memory.Cooperative, true)
    if (options.cooperative) {
      this.setupCoopQuadriDeck()
      this.setupCoopObjectives()
    } else {
      this.setupQuadriDeck()
      this.setupObjectiveDeck(options)
      this.dealObjectivesToPlayers()
    }
    this.placeInitialCard()
  }

  setupQuadriDeck() {
    const cards = getEnumValues(QuadriCard).flatMap(type =>
      Array.from({ length: 8 }, () => ({ id: type, location: { type: LocationType.QuadriDeck } }))
    )
    this.material(MaterialType.QuadriCard).createItems(cards)
    this.material(MaterialType.QuadriCard).shuffle()
  }

  setupCoopQuadriDeck() {
    const all = getEnumValues(QuadriCard).flatMap(type => Array.from({ length: 8 }, () => type))
    const selected = shuffle(all).slice(0, 20)
    this.material(MaterialType.QuadriCard).createItems(
      selected.map(id => ({ id, location: { type: LocationType.QuadriDeck } }))
    )
    this.material(MaterialType.QuadriCard).shuffle()
  }

  setupCoopObjectives() {
    const eligible = getEnumValues(ObjectiveCard)
      .filter(id => objectiveValues[id] === 4 || objectiveValues[id] === 5)
    this.material(MaterialType.ObjectiveCard).createItems(
      shuffle(eligible).slice(0, 10).map(id => ({ id, location: { type: LocationType.CoopObjective } }))
    )
  }

  setupObjectiveDeck(options: QuadriOptions) {
    const allObjectives = getEnumValues(ObjectiveCard)
    const pool = options.discoveryMode
      ? allObjectives.filter(id => objectiveValues[id] < 8)
      : allObjectives
    const objectives = shuffle(pool).slice(0, 30).map(id => ({
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
      .deal({ type: LocationType.Table, x: 0, y: 0 }, 1)
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
