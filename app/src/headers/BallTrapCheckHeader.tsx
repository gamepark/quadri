import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { PlayMoveButton, useLegalMove, usePlayerId, useRules } from '@gamepark/react-game'
import { isEndPlayerTurn, MaterialMove } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const BallTrapCheckHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<QuadriRules>()
  const me = usePlayerId()
  const activePlayers: number[] = rules?.game.rule?.players ?? []
  const isActive = me !== undefined && activePlayers.includes(me)
  const endTurnMove = useLegalMove<MaterialMove>(isEndPlayerTurn)

  if (isActive && endTurnMove) {
    return <PlayMoveButton move={endTurnMove} auto={0} style={{ display: 'none' }} />
  }

  if (isActive) {
    return <>{t('header.balltrap-check.mine')}</>
  }
  return <>{t('header.balltrap-check.other')}</>
}
