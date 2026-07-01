import { OriginType } from '@gamepark/react-game'
import { LocationOrigin } from '@gamepark/react-game'

// Original table bounds — used to convert absolute → edge-relative coordinates
const MIN_X = -50
const MAX_X = 50
const MIN_Y = -30
const MAX_Y = 30

// Items whose |x| or |y| exceeds this threshold are considered "near an edge"
const EDGE_THRESHOLD = 15

export function getEdgeOrigin(absX: number, absY: number): LocationOrigin {
  const x = absX > EDGE_THRESHOLD ? OriginType.Max : absX < -EDGE_THRESHOLD ? OriginType.Min : OriginType.Center
  const y = absY > EDGE_THRESHOLD ? OriginType.Max : absY < -EDGE_THRESHOLD ? OriginType.Min : OriginType.Center
  return { x, y }
}

export function toEdgeCoords(absX: number, absY: number) {
  const origin = getEdgeOrigin(absX, absY)
  return {
    x: origin.x === OriginType.Min ? absX - MIN_X
      : origin.x === OriginType.Max ? absX - MAX_X
      : absX,
    y: origin.y === OriginType.Min ? absY - MIN_Y
      : origin.y === OriginType.Max ? absY - MAX_Y
      : absY,
  }
}
