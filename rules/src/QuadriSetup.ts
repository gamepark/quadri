import { getEnumValues, MaterialGameSetup } from '@gamepark/rules-api'
import { shuffle } from 'es-toolkit/compat'
import { CoopDifficulty, GameMode, QuadriOptions } from './QuadriOptions'
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
    this.memorize(Memory.Mode, options.mode)
    switch (options.mode) {
      case GameMode.Cooperative:
        this.setupCoopQuadriDeck()
        this.setupCoopObjectives(options.coopDifficulty)
        break
      case GameMode.BallTrap:
        this.setupQuadriDeck()
        this.dealBallTrapObjectivesToPlayers()
        break
      default:
        this.setupQuadriDeck()
        this.setupObjectiveDeck(options.discovery)
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

  setupCoopObjectives(difficulty: CoopDifficulty) {
    // Easy: values 4 & 5 — Medium: + value 6 — Hard: + value 8.
    const maxValue = difficulty === CoopDifficulty.Hard ? 8 : difficulty === CoopDifficulty.Medium ? 6 : 5
    const eligible = getEnumValues(ObjectiveCard).filter(id => objectiveValues[id] >= 4 && objectiveValues[id] <= maxValue)
    this.material(MaterialType.ObjectiveCard).createItems(
      shuffle(eligible).slice(0, 10).map(id => ({ id, location: { type: LocationType.CoopObjective } }))
    )
  }

  setupObjectiveDeck(discovery: boolean) {
    const allObjectives = getEnumValues(ObjectiveCard)
    // Discovery mode removes the value-8 objectives (rulebook tip for new players).
    const pool = discovery ? allObjectives.filter(id => objectiveValues[id] < 8) : allObjectives
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

  dealBallTrapObjectivesToPlayers() {
    const eligible = getEnumValues(ObjectiveCard)
      .filter(id => objectiveValues[id] === 4 || objectiveValues[id] === 5)
    const needed = this.players.length * 3
    const selected = shuffle(eligible).slice(0, needed)
    const items = selected.map((id, index) => ({
      id,
      location: { type: LocationType.BallTrapHand, player: this.players[Math.floor(index / 3)] }
    }))
    this.material(MaterialType.ObjectiveCard).createItems(items)
  }

  start() {
    this.startPlayerTurn(RuleId.PlaceQuadriCard, this.players[0])
  }
}
