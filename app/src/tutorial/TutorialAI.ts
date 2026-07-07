import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { ObjectiveCard } from '@gamepark/quadri/material/ObjectiveCard'
import { objectivePatterns, objectiveValues } from '@gamepark/quadri/material/ObjectiveCardPattern'
import { QuadriCard } from '@gamepark/quadri/material/QuadriCard'
import { RuleId } from '@gamepark/quadri/rules/RuleId'
import { buildColorMap } from '@gamepark/quadri/rules/colorMap'
import { isObjectiveRealized } from '@gamepark/quadri/rules/objectiveCheck'
import { isMoveItemType, MaterialGame, MaterialItem, MaterialMove } from '@gamepark/rules-api'

export const ai = async (game: MaterialGame, player: number): Promise<MaterialMove[]> => {
  const rules = new QuadriRules(game as MaterialGame<number, MaterialType, LocationType>)
  const legalMoves = rules.getLegalMoves(player)
  if (legalMoves.length === 0) return []

  switch (game.rule?.id as RuleId | undefined) {
    case RuleId.PlaceQuadriCard:
      return [bestPlacementMove(rules, game, legalMoves, player)]
    default:
      return [legalMoves[0]]
  }
}

function getMyObjectives(rules: QuadriRules, player: number): ObjectiveCard[] {
  return rules.material(MaterialType.ObjectiveCard)
    .location(LocationType.PlayerHand).player(player)
    .getItems()
    .map(i => i.id as ObjectiveCard)
    .filter(id => id !== undefined)
}

function getOpponentObjectives(rules: QuadriRules, game: MaterialGame, player: number): ObjectiveCard[] {
  const result: ObjectiveCard[] = []
  for (const p of game.players as number[]) {
    if (p !== player) {
      rules.material(MaterialType.ObjectiveCard)
        .location(LocationType.PlayerHand).player(p)
        .getItems()
        .forEach(i => { if (i.id !== undefined) result.push(i.id as ObjectiveCard) })
    }
  }
  return result
}

function scorePosition(
  cardId: QuadriCard,
  x: number,
  y: number,
  rotation: number,
  tableCards: MaterialItem[],
  mine: ObjectiveCard[],
  theirs: ObjectiveCard[],
  randomize = true
): number {
  const simulated = { id: cardId, location: { type: LocationType.Table, x, y, rotation, z: tableCards.length } }
  const colorMap = buildColorMap([...tableCards, simulated as unknown as MaterialItem])

  let score = 0
  for (const id of mine) {
    if (isObjectiveRealized(objectivePatterns[id], colorMap)) score += objectiveValues[id] * 10
  }
  for (const id of theirs) {
    if (isObjectiveRealized(objectivePatterns[id], colorMap)) score -= objectiveValues[id] * 5
  }
  return score + (randomize ? Math.random() * 0.5 : 0)
}

// Each placement move already encodes a position AND a rotation, so we can pick the best directly.
function bestPlacementMove(
  rules: QuadriRules,
  game: MaterialGame,
  legalMoves: MaterialMove[],
  player: number
): MaterialMove {
  const revealedCard = rules.material(MaterialType.QuadriCard).location(LocationType.QuadriReveal).getItem()
  if (!revealedCard) return legalMoves[0]

  const cardId = revealedCard.id as QuadriCard
  const tableCards = rules.material(MaterialType.QuadriCard).location(LocationType.Table).getItems()
  const mine = getMyObjectives(rules, player)
  const theirs = getOpponentObjectives(rules, game, player)

  let best = legalMoves[0]
  let bestScore = -Infinity

  for (const move of legalMoves) {
    if (!isMoveItemType(MaterialType.QuadriCard)(move)) continue
    const { x, y, rotation } = move.location
    if (x === undefined || y === undefined) continue

    const s = scorePosition(cardId, x, y, (rotation as number) ?? 0, tableCards, mine, theirs)
    if (s > bestScore) {
      bestScore = s
      best = move
    }
  }

  return best
}
