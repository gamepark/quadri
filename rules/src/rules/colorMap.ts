import { MaterialItem } from '@gamepark/rules-api'
import { QuadriCard } from '../material/QuadriCard'
import { QuadriColor, quadriCardColors } from '../material/QuadriColor'

export type ColorMap = Map<string, QuadriColor>

export function buildColorMap(tableCards: MaterialItem[]): ColorMap {
  const map: ColorMap = new Map()
  const sorted = [...tableCards].sort((a, b) => (a.location.z ?? 0) - (b.location.z ?? 0))
  for (const card of sorted) {
    const cx = card.location.x ?? 0
    const cy = card.location.y ?? 0
    const rotation = (card.location.rotation as number) ?? 0
    for (let dx = 0; dx <= 1; dx++) {
      for (let dy = 0; dy <= 1; dy++) {
        map.set(`${cx + dx},${cy + dy}`, getColorAt(dx, dy, card.id as QuadriCard, rotation))
      }
    }
  }
  return map
}

// Returns the visible color at offset (dx, dy) within a card, accounting for rotation.
// Rotation 0=0°, 1=90°CW, 2=180°, 3=270°CW.
// colors = [TopLeft, TopRight, BottomLeft, BottomRight]
export function getColorAt(dx: number, dy: number, cardId: QuadriCard, rotation: number): QuadriColor {
  const colors = quadriCardColors[cardId]
  switch (rotation % 4) {
    case 1: return colors[(1 - dx) * 2 + dy]
    case 2: return colors[(1 - dy) * 2 + (1 - dx)]
    case 3: return colors[dx * 2 + (1 - dy)]
    default: return colors[dy * 2 + dx]
  }
}
