import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

type Position = { x: number; y: number; baseAngle: number }

const positionsByPlayerCount: Record<number, Position[]> = {
  2: [
    { x: -30, y: 24, baseAngle: 0 },
    { x: 40, y: 24, baseAngle: 0 },
  ],
  3: [
    { x: 0, y: 24, baseAngle: 180 },
    { x: 28, y: -14, baseAngle: 0 },
    { x: -28, y: -14, baseAngle: 0 },
  ],
  4: [
    { x: 0, y: 24, baseAngle: 180 },
    { x: 28, y: 0, baseAngle: 270 },
    { x: 0, y: -22, baseAngle: 0 },
    { x: -28, y: 0, baseAngle: 90 },
  ],
  5: [
    { x: 0, y: 24, baseAngle: 180 },
    { x: 28, y: 10, baseAngle: 270 },
    { x: 28, y: -14, baseAngle: 0 },
    { x: -28, y: -14, baseAngle: 0 },
    { x: -28, y: 10, baseAngle: 90 },
  ],
  6: [
    { x: 0, y: 24, baseAngle: 180 },
    { x: 28, y: 10, baseAngle: 270 },
    { x: 28, y: -14, baseAngle: 0 },
    { x: 0, y: -22, baseAngle: 0 },
    { x: -28, y: -14, baseAngle: 0 },
    { x: -28, y: 10, baseAngle: 90 },
  ],
}

class PlayerHandLocator extends HandLocator {

  getCoordinates(location: Location, context: MaterialContext) {
    const playerCount = context.rules.players.length
    const index = getRelativePlayerIndex(context, location.player)
    const positions = positionsByPlayerCount[playerCount] ?? positionsByPlayerCount[6]
    const pos = positions[index] ?? positions[0]
    return { x: pos.x, y: pos.y }
  }

  getBaseAngle(location: Location, context: MaterialContext) {
    const playerCount = context.rules.players.length
    const index = getRelativePlayerIndex(context, location.player)
    const positions = positionsByPlayerCount[playerCount] ?? positionsByPlayerCount[6]
    return (positions[index] ?? positions[0]).baseAngle
  }
}

export const playerHandLocator = new PlayerHandLocator()
