import { hideItemId, hideItemIdToOthers, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { CheckObjectivesRule } from './rules/CheckObjectivesRule'
import { PlaceQuadriCardRule } from './rules/PlaceQuadriCardRule'
import { RuleId } from './rules/RuleId'
import { RotateAndConfirmRule } from './rules/RotateAndConfirmRule'

export class QuadriRules
  extends SecretMaterialRules<number, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number>
{
  rules = {
    [RuleId.PlaceQuadriCard]: PlaceQuadriCardRule,
    [RuleId.RotateAndConfirm]: RotateAndConfirmRule,
    [RuleId.CheckObjectives]: CheckObjectivesRule,
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
    },
  }

  giveTime(): number {
    return 60
  }
}
