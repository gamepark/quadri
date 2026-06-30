import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ObjectiveCard } from '../material/ObjectiveCard'
import { objectiveValues } from '../material/ObjectiveCardPattern'

export class ScoreHelper extends MaterialRulesPart<number, MaterialType, LocationType> {
  getScore(player: number): number {
    return this.material(MaterialType.ObjectiveCard)
      .location(LocationType.ScoredObjectives)
      .player(player)
      .getItems()
      .reduce((sum, item) => sum + objectiveValues[item.id as ObjectiveCard], 0)
  }

  getObjectiveCount(player: number): number {
    return this.material(MaterialType.ObjectiveCard)
      .location(LocationType.ScoredObjectives)
      .player(player)
      .length
  }
}
