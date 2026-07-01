import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getEdgeOrigin, toEdgeCoords } from './edgeOrigin'

type Position = { x: number; y: number; baseAngle: number }

const positionsByPlayerCount: Record<number, Position[]> = {
  2: [
    { x: -30, y: 24, baseAngle: 0 },
    { x: 40, y: 24, baseAngle: 0 },
  ],
  3: [
    { x: -30, y: 24, baseAngle: 0 },
    { x: -30, y: -24, baseAngle: 180 },
    { x: 30, y: -24, baseAngle: 180 },
  ],
  4: [
    { x: -30, y: 24, baseAngle: 0 },
    { x: -30, y: -24, baseAngle: 180 },
    { x: 30, y: -24, baseAngle: 180 },
    { x: 30, y: 24, baseAngle: 0 },
  ],
  5: [],
  6: [],
}

class PlayerHandLocator extends HandLocator {

  getAbsoluteCoordinates(location: Location, context: MaterialContext): { x: number; y: number } {
    const playerCount = context.rules.players.length
    const index = getRelativePlayerIndex(context, location.player)
    const positions = positionsByPlayerCount[playerCount] ?? positionsByPlayerCount[6]
    const pos = positions[index] ?? positions[0]
    return { x: pos.x, y: pos.y }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const abs = this.getAbsoluteCoordinates(location, context)
    return toEdgeCoords(abs.x, abs.y)
  }

  getLocationOrigin(location: Location, context: MaterialContext) {
    const abs = this.getAbsoluteCoordinates(location, context)
    return getEdgeOrigin(abs.x, abs.y)
  }

  getBaseAngle(location: Location, context: MaterialContext) {
    const playerCount = context.rules.players.length
    const index = getRelativePlayerIndex(context, location.player)
    const positions = positionsByPlayerCount[playerCount] ?? positionsByPlayerCount[6]
    return (positions[index] ?? positions[0]).baseAngle
  }
}

export const playerHandLocator = new PlayerHandLocator()
