import { CompetitiveScore, hideItemId, hideItemIdToOthers, isStartRule, MaterialGame, MaterialItem, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { GameMode } from './QuadriOptions'
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
    return this.remind(Memory.Mode) === GameMode.Cooperative
  }

  isBallTrap(): boolean {
    return this.remind(Memory.Mode) === GameMode.BallTrap
  }

  hasWonCoop(): boolean | undefined {
    if (!this.isCooperative()) return undefined
    return this.remind<boolean | undefined>(Memory.CoopWon)
  }

  getScore(playerId: number): number {
    if (this.isCooperative()) {
      return this.remind<boolean>(Memory.CoopWon) ? 1 : 0
    }
    if (this.isBallTrap()) {
      // 1 point per objective still in hand (the last survivor scores the most).
      return this.material(MaterialType.ObjectiveCard)
        .location(LocationType.BallTrapHand).player(playerId).length
    }
    return new ScoreHelper(this.game).getScore(playerId)
  }

  getTieBreaker(tieBreaker: number, playerId: number): number | undefined {
    if (this.isCooperative() || this.isBallTrap()) return undefined
    if (tieBreaker === 1) return new ScoreHelper(this.game).getObjectiveCount(playerId)
    return undefined
  }

  isUnpredictableMove(move: MaterialMove<number, MaterialType, LocationType>, player: number): boolean {
    // Entering an objective-check rule triggers automatic scoring/elimination that depends
    // on objective ids hidden from this player (opponents' hands in competitive, one's own
    // hand in ball-trap). The client cannot predict the outcome, so it must wait for the
    // server. Coop objectives are public, so CoopCheckObjectives stays predictable.
    if (isStartRule(move) && (move.id === RuleId.CheckObjectives || move.id === RuleId.BallTrapCheckObjectives)) {
      return true
    }
    return super.isUnpredictableMove(move, player)
  }
}
