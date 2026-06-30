import { RuleId } from '@gamepark/quadri/rules/RuleId'
import { ComponentType } from 'react'
import { BallTrapCheckHeader } from './BallTrapCheckHeader'
import { CheckObjectivesHeader } from './CheckObjectivesHeader'
import { PlaceQuadriCardHeader } from './PlaceQuadriCardHeader'
import { RotateAndConfirmHeader } from './RotateAndConfirmHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlaceQuadriCard]: PlaceQuadriCardHeader,
  [RuleId.RotateAndConfirm]: RotateAndConfirmHeader,
  [RuleId.CheckObjectives]: CheckObjectivesHeader,
  [RuleId.BallTrapCheckObjectives]: BallTrapCheckHeader,
}
