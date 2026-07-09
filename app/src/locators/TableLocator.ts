import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { computeValidPositions } from '@gamepark/quadri/rules/placement'
import { Memory } from '@gamepark/quadri/rules/Memory'
import { ItemContext, MaterialContext, SquareGridDropAreaDescription, SquareGridLocator } from '@gamepark/react-game'
import { isMoveItem, Location, MaterialItem, MaterialMove, Polyomino } from '@gamepark/rules-api'

// Each Quadri card is 7cm × 7cm (2×2 squares), so each square = 3.5cm.
// Location (x, y) is the grid coordinate of the card's origin square; cards partially overlap.
const squareSize = 3.5

class TableLocator extends SquareGridLocator {
  size = squareSize

  // A single drop zone spans the whole reachable area instead of one drop area per valid position:
  // the framework snaps the dropped card to the nearest legal (position × rotation) — see getBestDropMove
  // in SquareGridDropAreaDescription — and previews it live while dragging.
  dropArea?: Polyomino = undefined

  // The drop zone spans the origin cells of the placed cards and of every legal placement. We use the
  // origin (x, y) — where cards are actually displayed — and NOT the 2×2 footprint they cover, otherwise
  // the area would be centered half a card off (down-right) from the cards. Excluding the previewed card
  // (like PlaceQuadriCardRule does) keeps the reachable area in sync with the offered moves.
  getDropArea(_location: Location, context: MaterialContext): Polyomino {
    const preview = context.rules.remind<number | undefined>(Memory.QuadriPreview)
    const tableCards = context.rules
      .material(MaterialType.QuadriCard)
      .location(LocationType.Table)
      .filter((_, index) => index !== preview)
      .getItems()
    const cells = [
      ...tableCards.map(card => ({ x: card.location.x ?? 0, y: card.location.y ?? 0 })),
      ...computeValidPositions(tableCards),
    ]

    const xMin = Math.min(...cells.map(c => c.x))
    const yMin = Math.min(...cells.map(c => c.y))
    const xMax = Math.max(...cells.map(c => c.x))
    const yMax = Math.max(...cells.map(c => c.y))

    const grid: (boolean | undefined)[][] = []
    for (let y = yMin; y <= yMax; y++) {
      grid.push(new Array<boolean | undefined>(xMax - xMin + 1).fill(undefined))
    }
    for (const c of cells) grid[c.y - yMin][c.x - xMin] = true
    return new Polyomino(grid, { xMin, yMin })
  }

  getLocationDescription(location: Location, context: MaterialContext | ItemContext) {
    if (location.x !== undefined || location.y !== undefined) return super.getLocationDescription(location, context)
    const dropArea = this.getDropArea(location, context)
    const { xMin, xMax, yMin, yMax } = this.getBoundaries(dropArea)
    return new TableDropArea({ width: xMax - xMin, height: yMax - yMin, borderRadius: 0.3 })
  }

  getLocationIndex(location: Location) {
    return location.z
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x = 0, y = 0 } = super.getItemCoordinates(item, context)
    // Overlapping cards are stacked by placement order (z = number of cards already on the table).
    return { x, y, z: (item.location.z ?? 0) * 0.05 }
  }
}

// The whole grid is one drop zone; canDrop rejects the previewed card's own cell so that releasing the
// card in place cannot send the validating move to the server. Validation stays the job of the ✓ button;
// dragging only re-previews the card at another cell (a local move).
class TableDropArea extends SquareGridDropAreaDescription {
  canDrop(move: MaterialMove, location: Location, context: ItemContext): boolean {
    if (!super.canDrop(move, location, context)) return false
    const preview = context.rules.remind<number | undefined>(Memory.QuadriPreview)
    if (preview !== undefined && isMoveItem(move) && move.itemIndex === preview) {
      const current = context.rules.material(MaterialType.QuadriCard).getItem(preview).location
      if (move.location.x === current.x && move.location.y === current.y) return false
    }
    return true
  }
}

export const tableLocator = new TableLocator()
