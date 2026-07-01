import { css } from '@emotion/react'
import { DevToolsHub, GameTable, GameTableNavigation, useGame } from '@gamepark/react-game'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { MaterialGame } from '@gamepark/rules-api'
import { PlayerPanels } from './panels/PlayerPanels'

// Each square is 3.5 cm, each card is 7×7 cm (center-based coordinates)
const squareSize = 3.5
const cardHalf = squareSize  // half of 7cm card = 3.5cm
const padding = 15           // breathing room around occupied area (cm)

// Minimum visible area (original defaults)
const MIN_X = -60
const MAX_X = 60
const MIN_Y = -30
const MAX_Y = 30

export function GameDisplay() {
  const game = useGame<MaterialGame>()
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }

  let xMin = MIN_X
  let xMax = MAX_X
  let yMin = MIN_Y
  let yMax = MAX_Y

  const tableCards = game?.items?.[MaterialType.QuadriCard]?.filter(
    item => item.location.type === LocationType.Table
  ) ?? []

  if (tableCards.length > 0) {
    const xs = tableCards.map(c => (c.location.x ?? 0) * squareSize)
    const ys = tableCards.map(c => (c.location.y ?? 0) * squareSize)
    xMin = Math.min(MIN_X, Math.min(...xs) - cardHalf - padding)
    xMax = Math.max(MAX_X, Math.max(...xs) + cardHalf + padding)
    yMin = Math.min(MIN_Y, Math.min(...ys) - cardHalf - padding)
    yMax = Math.max(MAX_Y, Math.max(...ys) + cardHalf + padding)
  }

  // Maintain the original 5:3 aspect ratio (100 × 60)
  const baseRatio = (MAX_X - MIN_X) / (MAX_Y - MIN_Y)
  const currentRatio = (xMax - xMin) / (yMax - yMin)
  if (currentRatio > baseRatio) {
    const targetHeight = (xMax - xMin) / baseRatio
    const extra = (targetHeight - (yMax - yMin)) / 2
    yMin -= extra
    yMax += extra
  } else if (currentRatio < baseRatio) {
    const targetWidth = (yMax - yMin) * baseRatio
    const extra = (targetWidth - (xMax - xMin)) / 2
    xMin -= extra
    xMax += extra
  }

  return (
    <>
      <GameTable xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} margin={margin} zoom={false} css={process.env.NODE_ENV === 'development' && tableBorder}>
        <GameTableNavigation />
        <PlayerPanels />
        {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(5em)" />}
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
