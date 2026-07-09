import { css } from '@emotion/react'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { DevToolsHub, GameTable, GameTableNavigation, useRules } from '@gamepark/react-game'
import { CARD, columnMetrics, getMode } from './locators/layout'
import { PlayerPanels } from './panels/PlayerPanels'

// Each square is 3.5 cm, each card is 7×7 cm (center-based coordinates).
const squareSize = 3.5
const cardHalf = squareSize // half of a 7cm card
const PAD = 3 // breathing room around the play zone (cm)
// Vertical breathing room around the column: tighter than PAD now the deck counters sit inside the top
// card (lower-right corner) instead of hanging below it.
const COL_V_PAD = 2
const COL_GAP = 2 // gap between the left column and the play zone (cm)
const MIN_PLAY = 5 * CARD // the play zone always spans at least 5 cards wide and tall

// Card-edge bounds of the given card-center coordinates, widened to at least `min` and kept centered.
function playBounds(centers: number[], min: number): [number, number] {
  const lo = (centers.length ? Math.min(...centers) : 0) - cardHalf
  const hi = (centers.length ? Math.max(...centers) : 0) + cardHalf
  const mid = (lo + hi) / 2
  const half = Math.max((hi - lo) / 2, min / 2)
  return [mid - half, mid + half]
}

export function GameDisplay() {
  const rules = useRules<QuadriRules>()
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }

  if (!rules?.game) return null

  const playerCount = rules.players.length
  const mode = getMode(rules)
  const { width: colWidth, height: colHeight } = columnMetrics(playerCount, mode)

  // Play zone bounds — there is always at least the initial card on the table.
  const tableCards = rules.material(MaterialType.QuadriCard).location(LocationType.Table).getItems()
  const xs = tableCards.map(c => (c.location.x ?? 0) * squareSize)
  const ys = tableCards.map(c => (c.location.y ?? 0) * squareSize)
  const [cxMin, cxMax] = playBounds(xs, MIN_PLAY)
  const [cyMin, cyMax] = playBounds(ys, MIN_PLAY)
  const playLeft = cxMin - PAD
  const playRight = cxMax + PAD
  const playTop = cyMin - PAD
  const playBottom = cyMax + PAD

  // The left column is pinned to the left edge; reserve its width just left of the play zone,
  // keeping a constant gap regardless of how far the play zone grows.
  const xMin = playLeft - COL_GAP - colWidth
  const xMax = playRight

  // Vertically center both the play zone and the column on the play zone's center.
  const playCenterY = (playTop + playBottom) / 2
  const boxHeight = Math.max(playBottom - playTop, colHeight + 2 * COL_V_PAD)
  const yMin = playCenterY - boxHeight / 2
  const yMax = playCenterY + boxHeight / 2

  return (
    <GameTable xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} margin={margin} zoom={false} css={process.env.NODE_ENV === 'development' && tableBorder}>
      <GameTableNavigation />
      <PlayerPanels />
      {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(5em)" />}
    </GameTable>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
