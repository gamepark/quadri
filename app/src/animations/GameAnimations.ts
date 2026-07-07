import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { isEqual } from 'es-toolkit'

export const gameAnimations = new MaterialGameAnimations()

// Rotating a Quadri card (before placing it or while previewing it on the table) is a local move:
// the card stays in place and only its rotation changes. Keep it snappy instead of the 1s default.
gameAnimations.when().move((move, context) => {
  if (!isMoveItemType(MaterialType.QuadriCard)(move)) return false
  const item = context.rules.material(MaterialType.QuadriCard).getItem(move.itemIndex)
  if (!item) return false
  const { rotation: fromRotation, ...fromLocation } = item.location
  const { rotation: toRotation, ...toLocation } = move.location
  return isEqual(fromLocation, toLocation) && fromRotation !== toRotation
}).duration(0.2)
