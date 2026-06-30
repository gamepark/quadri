import { css } from '@emotion/react'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import objBack from '../images/objectifs/objectif_dos.jpg'

// CMYK: player 1 = Cyan, 2 = Magenta, 3 = Yellow, 4 = Key (black)
const cmykColors: Record<number, { border: string; bg: string }> = {
  1: { border: '#00C8E0', bg: 'rgba(0, 200, 224, 0.60)' },
  2: { border: '#DC00C8', bg: 'rgba(220, 0, 200, 0.60)' },
  3: { border: '#E0D000', bg: 'rgba(224, 208, 0, 0.60)' },
  4: { border: '#000000', bg: 'rgba(0, 0, 0, 0.60)' },
}

export const PlayerPanels = () => {
  const rules = useRules<QuadriRules>()!
  const players = usePlayers<number>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) return null

  const showScore = !rules.isCooperative() && !rules.isBallTrap()

  return createPortal(
    <>
      {players.map((player, index) => {
        const color = cmykColors[player.id] ?? cmykColors[1]
        return (
          <StyledPlayerPanel
            key={player.id}
            player={player}
            css={[panelPosition(index), playerColorCss(color)]}
            counters={showScore ? [{ image: objBack, value: rules.getScore(player.id) }] : []}
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

const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
`
