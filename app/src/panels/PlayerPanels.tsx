import { css } from '@emotion/react'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import { getHandPosition } from '../locators/PlayerHandLocator'
import star from '../images/star.png'

// CMYK: player 1 = Cyan, 2 = Magenta, 3 = Yellow, 4 = Key (black)
const cmykColors: Record<number, { border: string; bg: string }> = {
  1: { border: '#00C8E0', bg: 'rgba(0, 200, 224, 0.60)' },
  2: { border: '#DC00C8', bg: 'rgba(220, 0, 200, 0.60)' },
  3: { border: '#E0D000', bg: 'rgba(224, 208, 0, 0.60)' },
  4: { border: '#000000', bg: 'rgba(0, 0, 0, 0.60)' },
  5: { border: '#F0F0EC', bg: 'rgba(240, 240, 236, 0.60)' },
  6: { border: '#8800C8', bg: 'rgba(136, 0, 200, 0.60)' },
}

export const PlayerPanels = () => {
  const rules = useRules<QuadriRules>()!
  const players = usePlayers<number>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) return null

  const isCoop = rules.isCooperative()
  const showScore = !isCoop && !rules.isBallTrap()

  if (isCoop) {
    return createPortal(
      <div css={coopContainerCss}>
        {players.map((player) => {
          const color = cmykColors[player.id] ?? cmykColors[1]
          return (
            <StyledPlayerPanel
              key={player.id}
              player={player}
              css={[coopPanelCss, playerColorCss(color)]}
              counters={[]}
              activeRing
            />
          )
        })}
      </div>,
      root
    )
  }

  return createPortal(
    <>
      {players.map((player, relativeIndex) => {
        const color = cmykColors[player.id] ?? cmykColors[1]
        const handPos = getHandPosition(players.length, relativeIndex)
        return (
          <StyledPlayerPanel
            key={player.id}
            player={player}
            css={[cornerPanelPosition(handPos), playerColorCss(color)]}
            counters={showScore ? [{ image: star, value: rules.getScore(player.id) }] : []}
            activeRing
          />
        )
      })}
    </>,
    root
  )
}

const playerColorCss = ({ border, bg }: { border: string; bg: string }) => css`
  background: ${bg} !important;
  border: 0.2em solid ${border} !important;
  box-shadow: inset 0.15em 0 0.5em ${bg}, 0 0.1em 0.4em rgba(0,0,0,0.5) !important;
`

const cornerPanelPosition = (pos: { x: number; y: number }) => css`
  position: fixed;
  ${pos.y >= 0 ? 'bottom: 0.5em;' : 'top: 7.5em;'}
  ${pos.x < 0 ? 'left: 1em;' : 'right: 1em;'}
  width: 28em;
`

const coopContainerCss = css`
  position: fixed;
  bottom: 1em;
  left: 1em;
  right: 1em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5em;
  justify-content: center;
  align-items: flex-end;
  pointer-events: none;
  & > * {
    pointer-events: auto;
  }
`

const coopPanelCss = css`
  position: relative !important;
  flex: 0 1 28em;
  min-width: 16em;
`
