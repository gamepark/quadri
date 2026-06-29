import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { objectiveCardDescription } from './ObjectiveCardDescription'
import { quadriCardDescription } from './QuadriCardDescription.tsx'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.QuadriCard]: quadriCardDescription,
  [MaterialType.ObjectiveCard]: objectiveCardDescription,
}
