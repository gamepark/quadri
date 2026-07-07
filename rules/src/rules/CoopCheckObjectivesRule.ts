import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { ObjectiveCard } from '../material/ObjectiveCard'
import { objectivePatterns } from '../material/ObjectiveCardPattern'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { buildColorMap } from './colorMap'
import { isObjectiveRealized } from './objectiveCheck'
import { RuleId } from './RuleId'

export class CoopCheckObjectivesRule extends PlayerTurnRule<number, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<number, MaterialType, LocationType, RuleId>[] {
    const colorMap = buildColorMap(
      this.material(MaterialType.QuadriCard).location(LocationType.Table).getItems()
    )
    const remaining = this.material(MaterialType.ObjectiveCard).location(LocationType.CoopObjective)
    const moves: MaterialMove<number, MaterialType, LocationType, RuleId>[] = []
    for (const item of remaining.getItems()) {
      if (isObjectiveRealized(objectivePatterns[item.id as ObjectiveCard], colorMap)) {
        moves.push(remaining.id(item.id).moveItem({ type: LocationType.CoopRealisedObjectives }))
      }
    }
    const willRemain = remaining.length - moves.length
    if (willRemain === 0) {
      return [...moves, this.endGame()]
    }
    return [...moves, this.startPlayerTurn(RuleId.PlaceQuadriCard, this.nextPlayer)]
  }
}
