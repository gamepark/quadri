import { RuleId } from '@gamepark/quadri/rules/RuleId'
import { ComponentType } from 'react'
import { PlaceQuadriCardHeader } from './PlaceQuadriCardHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlaceQuadriCard]: PlaceQuadriCardHeader,
}
