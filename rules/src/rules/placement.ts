import { MaterialItem } from '@gamepark/rules-api'

export function computeValidPositions(tableCards: MaterialItem[]): { x: number; y: number }[] {
  if (tableCards.length === 0) return [{ x: 0, y: 0 }]

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
    const totalOverlap = tableCards.reduce((sum, card) => {
      const dx = Math.abs(x - (card.location.x ?? 0))
      const dy = Math.abs(y - (card.location.y ?? 0))
      return dx <= 1 && dy <= 1 ? sum + (2 - dx) * (2 - dy) : sum
    }, 0)

    if (totalOverlap >= 1 && totalOverlap <= 3) {
      validPositions.push({ x, y })
    }
  }

  return validPositions
}
