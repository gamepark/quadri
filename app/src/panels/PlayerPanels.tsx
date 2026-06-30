import { css } from '@emotion/react'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import objBack from '../images/objectifs/objectif_dos.jpg'

export const PlayerPanels = () => {
  const rules = useRules<QuadriRules>()!
  const players = usePlayers<number>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) return null

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel
          key={player.id}
          player={player}
          css={panelPosition(index)}
          counters={[{ image: objBack, value: rules.getScore(player.id) }]}
          activeRing
        />
      ))}
    </>,
    root
  )
}

const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
`
