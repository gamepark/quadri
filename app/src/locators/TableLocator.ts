import { LocationType } from '@gamepark/quadri/material/LocationType'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

// Each Quadri card is 7cm × 7cm (2×2 squares), so each square = 3.5cm.
// Location (x, y) represents the grid column/row of the card's top-left square.
// Card center in cm = (x * squareSize, y * squareSize).
const squareSize = 3.5

class TableLocator extends Locator {
  getLocationCoordinates(location: Location, _context: MaterialContext) {
    return {
      x: (location.x ?? 0) * squareSize,
      y: (location.y ?? 0) * squareSize,
    }
  }

  getItemCoordinates(item: MaterialItem) {
    return {
      x: (item.location.x ?? 0) * squareSize,
      y: (item.location.y ?? 0) * squareSize,
      z: item.location.type === LocationType.QuadriPending ? 999 : (item.location.z ?? 0),
    }
  }

  getItemRotateZ(item: MaterialItem) {
    return (item.location.rotation as number ?? 0) * 90
  }
}

export const tableLocator = new TableLocator()
