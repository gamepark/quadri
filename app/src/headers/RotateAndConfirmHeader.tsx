import { CustomMoveType } from '@gamepark/quadri/rules/CustomMoveType'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const RotateAndConfirmHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<QuadriRules>()
  const me = usePlayerId()
  const activePlayer = rules?.game.rule?.player
  const isMyTurn = me !== undefined && activePlayer === me
  const playerName = usePlayerName(activePlayer)

  const confirmMove = useLegalMove(isCustomMoveType(CustomMoveType.ConfirmPlacement))

  if (isMyTurn) {
    return (
      <Trans
        i18nKey="header.rotate-confirm.mine"
        components={{ confirm: <PlayMoveButton move={confirmMove} /> }}
      />
    )
  }
  return <>{t('header.rotate-confirm.other', { player: playerName })}</>
}
