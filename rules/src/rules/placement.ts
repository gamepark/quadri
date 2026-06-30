import { MaterialItem } from '@gamepark/rules-api'

export function computeValidPositions(tableCards: MaterialItem[]): { x: number; y: number }[] {
  if (tableCards.length === 0) return [{ x: 0, y: 0 }]

  const occupiedSquares = new Set<string>()
  for (const card of tableCards) {
    const cx = card.location.x ?? 0
    const cy = card.location.y ?? 0
    occupiedSquares.add(`${cx},${cy}`)
    occupiedSquares.add(`${cx + 1},${cy}`)
    occupiedSquares.add(`${cx},${cy + 1}`)
    occupiedSquares.add(`${cx + 1},${cy + 1}`)
  }

  const candidates = new Set<string>()
  for (const card of tableCards) {
    const cx = card.location.x ?? 0
    const cy = card.location.y ?? 0
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        candidates.add(`${cx + dx},${cy + dy}`)
      }
    }
  }

  const validPositions: { x: number; y: number }[] = []
  for (const key of candidates) {
    const [x, y] = key.split(',').map(Number)
    const overlap =
      (occupiedSquares.has(`${x},${y}`) ? 1 : 0) +
      (occupiedSquares.has(`${x + 1},${y}`) ? 1 : 0) +
      (occupiedSquares.has(`${x},${y + 1}`) ? 1 : 0) +
      (occupiedSquares.has(`${x + 1},${y + 1}`) ? 1 : 0)

    if (overlap >= 1 && overlap <= 3) {
      validPositions.push({ x, y })
    }
  }

  return validPositions
}
