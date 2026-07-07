import { RuleId } from '@gamepark/quadri/rules/RuleId'
import { ComponentType } from 'react'
import { BallTrapCheckHeader } from './BallTrapCheckHeader'
import { CheckObjectivesHeader } from './CheckObjectivesHeader'
import { CoopCheckObjectivesHeader } from './CoopCheckObjectivesHeader'
import { PlaceQuadriCardHeader } from './PlaceQuadriCardHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlaceQuadriCard]: PlaceQuadriCardHeader,
  [RuleId.CheckObjectives]: CheckObjectivesHeader,
  [RuleId.CoopCheckObjectives]: CoopCheckObjectivesHeader,
  [RuleId.BallTrapCheckObjectives]: BallTrapCheckHeader,
}
