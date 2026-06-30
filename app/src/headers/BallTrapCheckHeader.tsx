import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { PlayMoveButton, useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { isEndPlayerTurn, isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'

export const BallTrapCheckHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<QuadriRules>()
  const me = usePlayerId()
  const activePlayers: number[] = rules?.game.rule?.players ?? []
  const isActive = me !== undefined && activePlayers.includes(me)
  const legalMoves = useLegalMoves<MaterialMove>()

  const endTurnMove = legalMoves.find(move => isEndPlayerTurn(move))
  const hasEliminationMoves = legalMoves.some(move => isMoveItemType(MaterialType.ObjectiveCard)(move))

  if (isActive && endTurnMove && !hasEliminationMoves) {
    return <PlayMoveButton move={endTurnMove} auto={0} style={{ display: 'none' }} />
  }

  if (isActive) {
    return <>{t('header.balltrap-check.mine')}</>
  }
  return <>{t('header.balltrap-check.other')}</>
}
