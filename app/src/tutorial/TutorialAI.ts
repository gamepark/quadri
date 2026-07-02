import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { ObjectiveCard } from '@gamepark/quadri/material/ObjectiveCard'
import { objectivePatterns, objectiveValues } from '@gamepark/quadri/material/ObjectiveCardPattern'
import { QuadriCard } from '@gamepark/quadri/material/QuadriCard'
import { CustomMoveType } from '@gamepark/quadri/rules/CustomMoveType'
import { RuleId } from '@gamepark/quadri/rules/RuleId'
import { buildColorMap } from '@gamepark/quadri/rules/colorMap'
import { isObjectiveRealized } from '@gamepark/quadri/rules/objectiveCheck'
import { isCustomMoveType, isMoveItemType, MaterialGame, MaterialItem, MaterialMove } from '@gamepark/rules-api'

export const ai = async (game: MaterialGame, player: number): Promise<MaterialMove[]> => {
  const rules = new QuadriRules(game as any)
  const legalMoves = rules.getLegalMoves(player)
  if (legalMoves.length === 0) return []

  switch (game.rule?.id as RuleId | undefined) {
    case RuleId.PlaceQuadriCard:
      return [bestPlacementMove(rules, game, legalMoves, player)]
    case RuleId.RotateAndConfirm:
      return [bestRotateOrConfirm(rules, game, legalMoves, player)]
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
    const { x, y } = move.location
    if (x === undefined || y === undefined) continue

    // Evaluate all 4 rotations for this position and keep the best
    let posScore = -Infinity
    for (let r = 0; r < 4; r++) {
      const s = scorePosition(cardId, x, y, r, tableCards, mine, theirs)
      if (s > posScore) posScore = s
    }

    if (posScore > bestScore) {
      bestScore = posScore
      best = move
    }
  }

  return best
}

function bestRotateOrConfirm(
  rules: QuadriRules,
  game: MaterialGame,
  legalMoves: MaterialMove[],
  player: number
): MaterialMove {
  const pending = rules.material(MaterialType.QuadriCard).location(LocationType.QuadriPending).getItem()
  const confirm = legalMoves.find(m => isCustomMoveType(CustomMoveType.ConfirmPlacement)(m))

  if (!pending) return confirm ?? legalMoves[0]

  const cardId = pending.id as QuadriCard
  const currentRot = (pending.location.rotation as number) ?? 0
  const x = pending.location.x ?? 0
  const y = pending.location.y ?? 0
  const tableCards = rules.material(MaterialType.QuadriCard).location(LocationType.Table).getItems()
  const mine = getMyObjectives(rules, player)
  const theirs = getOpponentObjectives(rules, game, player)

  let bestRot = currentRot
  let bestScore = -Infinity
  for (let r = 0; r < 4; r++) {
    const s = scorePosition(cardId, x, y, r, tableCards, mine, theirs, false)
    if (s > bestScore) { bestScore = s; bestRot = r }
  }

  if (bestRot === currentRot) return confirm ?? legalMoves[0]

  // Step toward best rotation — choose CW or CCW, whichever is shorter
  const cwSteps = (bestRot - currentRot + 4) % 4
  const ccwSteps = (currentRot - bestRot + 4) % 4
  const nextRot = cwSteps <= ccwSteps ? (currentRot + 1) % 4 : (currentRot + 3) % 4

  const rotateMove = legalMoves.find(m =>
    isMoveItemType(MaterialType.QuadriCard)(m) &&
    m.location.type === LocationType.QuadriPending &&
    m.location.rotation === nextRot
  )

  return rotateMove ?? confirm ?? legalMoves[0]
}
