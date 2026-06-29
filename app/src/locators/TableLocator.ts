import { Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

// Each Quadri card is 7cm × 7cm (2×2 squares), so each square = 3.5cm.
// Location (x, y) represents the grid column/row of the card's top-left square.
// Card center in cm = (x * squareSize, y * squareSize).
const squareSize = 3.5

class TableLocator extends Locator {
  getItemCoordinates(item: MaterialItem) {
    return {
      x: (item.location.x ?? 0) * squareSize,
      y: (item.location.y ?? -2) * squareSize,
    }
  }
}

export const tableLocator = new TableLocator()
