import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { objectiveCardDescription } from './ObjectiveCardDescription'
import { quadriCardDescription } from './QuadriCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.QuadriCard]: quadriCardDescription,
  [MaterialType.ObjectiveCard]: objectiveCardDescription,
}
