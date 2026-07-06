import { CompetitiveScore, hideItemId, hideItemIdToOthers, MaterialGame, MaterialItem, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { BallTrapCheckRule } from './rules/BallTrapCheckRule'
import { CheckObjectivesRule } from './rules/CheckObjectivesRule'
import { CoopCheckObjectivesRule } from './rules/CoopCheckObjectivesRule'
import { Memory } from './rules/Memory'
import { PlaceQuadriCardRule } from './rules/PlaceQuadriCardRule'
import { RuleId } from './rules/RuleId'
import { RotateAndConfirmRule } from './rules/RotateAndConfirmRule'
import { ScoreHelper } from './rules/ScoreHelper'

const hideItemIdFromOwner = (item: MaterialItem<number, LocationType>, player?: number): string[] =>
  item.location.player === player ? ['id'] : []

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
    [RuleId.BallTrapCheckObjectives]: BallTrapCheckRule,
  }

  hidingStrategies = {
    [MaterialType.QuadriCard]: {
      [LocationType.QuadriDeck]: hideItemId,
      [LocationType.PlayerHand]: hideItemIdToOthers,
    },
    [MaterialType.ObjectiveCard]: {
      [LocationType.ObjectiveDeck]: hideItemId,
      [LocationType.PlayerHand]: hideItemIdToOthers,
      [LocationType.BallTrapHand]: hideItemIdFromOwner,
      [LocationType.CoopRealisedObjectives]: hideItemId,
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
      [LocationType.BallTrapHand]: new PositiveSequenceStrategy(),
      [LocationType.BallTrapEliminatedObjectives]: new PositiveSequenceStrategy(),
      [LocationType.CoopRealisedObjectives]: new PositiveSequenceStrategy(),
      [LocationType.ScoredObjectives]: new PositiveSequenceStrategy(),
    },
  }

  giveTime(): number {
    return 60
  }

  isCooperative(): boolean {
    return !!this.remind(Memory.Cooperative)
  }

  isBallTrap(): boolean {
    return !!this.remind(Memory.BallTrap)
  }

  hasWonCoop(): boolean | undefined {
    if (!this.remind(Memory.Cooperative)) return undefined
    return this.remind<boolean | undefined>(Memory.CoopWon)
  }

  getScore(playerId: number): number {
    if (this.remind(Memory.Cooperative)) {
      return this.remind<boolean>(Memory.CoopWon) ? 1 : 0
    }
    if (this.remind(Memory.BallTrap)) {
      // 1 point per objective still in hand (the last survivor scores the most).
      return this.material(MaterialType.ObjectiveCard)
        .location(LocationType.BallTrapHand).player(playerId).length
    }
    return new ScoreHelper(this.game).getScore(playerId)
  }

  getTieBreaker(tieBreaker: number, playerId: number): number | undefined {
    if (this.remind(Memory.Cooperative) || this.remind(Memory.BallTrap)) return undefined
    if (tieBreaker === 1) return new ScoreHelper(this.game).getObjectiveCount(playerId)
    return undefined
  }
}
