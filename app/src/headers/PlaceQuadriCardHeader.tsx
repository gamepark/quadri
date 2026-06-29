import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { GameTemplateRules } from '@gamepark/game-template/GameTemplateRules'

export const PlaceQuadriCardHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<GameTemplateRules>()
  const me = usePlayerId()
  const activePlayer = rules?.game.rule?.player
  const isMyTurn = me !== undefined && activePlayer === me
  const playerName = usePlayerName(activePlayer)

  if (isMyTurn) {
    return <>{t('header.place-card.mine')}</>
  }
  return <>{t('header.place-card.other', { player: playerName })}</>
}
