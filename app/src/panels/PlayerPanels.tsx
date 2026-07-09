import { css } from '@emotion/react'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import star from '../images/star.png'
import { getMode, PANEL_LEFT, PANEL_SCALE, panelCenterY } from '../locators/layout'

// CMYK: player 1 = Cyan, 2 = Magenta, 3 = Yellow, 4 = Key (black)
const cmykColors: Record<number, { border: string; bg: string }> = {
  1: { border: '#00C8E0', bg: 'rgba(0, 200, 224, 0.60)' },
  2: { border: '#DC00C8', bg: 'rgba(220, 0, 200, 0.60)' },
  3: { border: '#E0D000', bg: 'rgba(224, 208, 0, 0.60)' },
  4: { border: '#000000', bg: 'rgba(0, 0, 0, 0.60)' },
  5: { border: '#F0F0EC', bg: 'rgba(240, 240, 236, 0.60)' },
  6: { border: '#8800C8', bg: 'rgba(136, 0, 200, 0.60)' },
}

// Approximate scaled half-height of a panel, used to vertically center it on its row.
const PANEL_HALF_H = 2.5

/**
 * Player panels form a vertical column pinned to the left edge of the table (local player on top).
 * They live inside the table coordinate space so they scale together with the cards and the play zone.
 */
export const PlayerPanels = () => {
  const rules = useRules<QuadriRules>()!
  const players = usePlayers<number>({ sortFromMe: true })
  const mode = getMode(rules)
  const showScore = !rules.isCooperative() && !rules.isBallTrap()

  return (
    <>
      {players.map((player, index) => {
        const color = cmykColors[player.id] ?? cmykColors[1]
        return (
          <StyledPlayerPanel
            key={player.id}
            player={player}
            css={[panelPosition(index, players.length, mode), playerColorCss(color)]}
            counters={showScore ? [{ image: star, value: rules.getScore(player.id) }] : []}
            activeRing
          />
        )
      })}
    </>
  )
}

const playerColorCss = ({ border, bg }: { border: string; bg: string }) => css`
  background: ${bg} !important;
  border: 0.2em solid ${border} !important;
  box-shadow: inset 0.15em 0 0.5em ${bg}, 0 0.1em 0.4em rgba(0, 0, 0, 0.5) !important;
`

const panelPosition = (index: number, playerCount: number, mode: ReturnType<typeof getMode>) => css`
  position: absolute;
  left: ${PANEL_LEFT}em;
  top: calc(50% + ${panelCenterY(index, playerCount, mode) - PANEL_HALF_H}em);
  transform-origin: top left;
  transform: scale(${PANEL_SCALE});
`
