import { getRelativePlayerIndex, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

// Scored objectives are placed near each player's position
const positions = [
  { x: 15, y: 27 },    // bottom (me)
  { x: 42, y: 5 },     // bottom-right
  { x: 42, y: -5 },    // top-right
  { x: 15, y: -27 },   // top
  { x: -42, y: -5 },   // top-left
  { x: -42, y: 5 },    // bottom-left
]

class ScoredObjectivesLocator extends PileLocator {
  radius = 1
  maxAngle = 10

  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    return positions[index] ?? positions[0]
  }
}

export const scoredObjectivesLocator = new ScoredObjectivesLocator()
