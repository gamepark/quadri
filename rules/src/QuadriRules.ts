import { CompetitiveScore, hideItemId, hideItemIdToOthers, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { CheckObjectivesRule } from './rules/CheckObjectivesRule'
import { CoopCheckObjectivesRule } from './rules/CoopCheckObjectivesRule'
import { Memory } from './rules/Memory'
import { PlaceQuadriCardRule } from './rules/PlaceQuadriCardRule'
import { RuleId } from './rules/RuleId'
import { RotateAndConfirmRule } from './rules/RotateAndConfirmRule'
import { ScoreHelper } from './rules/ScoreHelper'

export class QuadriRules
  extends SecretMaterialRules<number, MaterialType, LocationType>
  implements
    TimeLimit<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number>,
    CompetitiveScore<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number>
{
  rules = {
    [RuleId.PlaceQuadriCard]: PlaceQuadriCardRule,
    [RuleId.RotateAndConfirm]: RotateAndConfirmRule,
    [RuleId.CheckObjectives]: CheckObjectivesRule,
    [RuleId.CoopCheckObjectives]: CoopCheckObjectivesRule,
  }

  hidingStrategies = {
    [MaterialType.QuadriCard]: {
      [LocationType.QuadriDeck]: hideItemId,
      [LocationType.PlayerHand]: hideItemIdToOthers,
    },
    [MaterialType.ObjectiveCard]: {
      [LocationType.ObjectiveDeck]: hideItemId,
      [LocationType.PlayerHand]: hideItemIdToOthers,
    },
  }

  locationsStrategies = {
    [MaterialType.QuadriCard]: {
      [LocationType.QuadriDeck]: new PositiveSequenceStrategy(),
      [LocationType.Table]: new PositiveSequenceStrategy('z'),
    },
    [MaterialType.ObjectiveCard]: {
      [LocationType.ObjectiveDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.CoopObjective]: new PositiveSequenceStrategy('x'),
    },
  }

  giveTime(): number {
    return 60
  }

  isCooperative(): boolean {
    return !!this.remind(Memory.Cooperative)
  }

  hasWonCoop(): boolean | undefined {
    if (!this.remind(Memory.Cooperative)) return undefined
    return this.remind<boolean | undefined>(Memory.CoopWon)
  }

  getScore(playerId: number): number {
    if (this.remind(Memory.Cooperative)) {
      return this.remind<boolean>(Memory.CoopWon) ? 1 : 0
    }
    return new ScoreHelper(this.game).getScore(playerId)
  }

  getTieBreaker(tieBreaker: number, playerId: number): number | undefined {
    if (this.remind(Memory.Cooperative)) return undefined
    if (tieBreaker === 1) return new ScoreHelper(this.game).getObjectiveCount(playerId)
    return undefined
  }
}
