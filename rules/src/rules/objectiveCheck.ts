import { ObjectivePattern, ObjectiveSquare } from '../material/ObjectiveCardPattern'
import { ColorMap } from './colorMap'

export function isObjectiveRealized(pattern: ObjectivePattern | undefined, colorMap: ColorMap): boolean {
  if (!pattern || pattern.length === 0) return false
  for (const variant of getPatternVariants(pattern)) {
    if (matchesAnyPosition(variant, colorMap)) return true
  }
  return false
}

// All 8 dihedral symmetries (4 rotations × 2 mirror states).
function getPatternVariants(pattern: ObjectivePattern): ObjectivePattern[] {
  const r0 = pattern
  const r1 = rotatePattern90CW(r0)
  const r2 = rotatePattern90CW(r1)
  const r3 = rotatePattern90CW(r2)
  const m0 = pattern.map(s => ({ ...s, x: -s.x }))
  const m1 = rotatePattern90CW(m0)
  const m2 = rotatePattern90CW(m1)
  const m3 = rotatePattern90CW(m2)

  const seen = new Set<string>()
  return [r0, r1, r2, r3, m0, m1, m2, m3].filter(v => {
    const key = normalizeKey(v)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// 90° clockwise rotation: (x, y) → (maxY - y, x)
function rotatePattern90CW(pattern: ObjectivePattern): ObjectivePattern {
  const maxY = Math.max(...pattern.map(s => s.y))
  return pattern.map(s => ({ x: maxY - s.y, y: s.x, color: s.color }))
}

function normalizeKey(pattern: ObjectivePattern): string {
  const minX = Math.min(...pattern.map(s => s.x))
  const minY = Math.min(...pattern.map(s => s.y))
  const shifted = pattern.map(s => ({ x: s.x - minX, y: s.y - minY, color: s.color }))
  shifted.sort((a, b) => a.y - b.y || a.x - b.x || a.color - b.color)
  return JSON.stringify(shifted)
}

function matchesAnyPosition(pattern: ObjectivePattern, colorMap: ColorMap): boolean {
  if (colorMap.size === 0) return false
  const positions = [...colorMap.keys()].map(k => {
    const [px, py] = k.split(',').map(Number)
    return { x: px, y: py }
  })
  const minX = Math.min(...positions.map(p => p.x))
  const maxX = Math.max(...positions.map(p => p.x))
  const minY = Math.min(...positions.map(p => p.y))
  const maxY = Math.max(...positions.map(p => p.y))
  const patMinX = Math.min(...pattern.map((s: ObjectiveSquare) => s.x))
  const patMaxX = Math.max(...pattern.map((s: ObjectiveSquare) => s.x))
  const patMinY = Math.min(...pattern.map((s: ObjectiveSquare) => s.y))
  const patMaxY = Math.max(...pattern.map((s: ObjectiveSquare) => s.y))

  for (let bx = minX - patMaxX; bx <= maxX - patMinX; bx++) {
    for (let by = minY - patMaxY; by <= maxY - patMinY; by++) {
      if (pattern.every((s: ObjectiveSquare) => colorMap.get(`${bx + s.x},${by + s.y}`) === s.color)) {
        return true
      }
    }
  }
  return false
}
