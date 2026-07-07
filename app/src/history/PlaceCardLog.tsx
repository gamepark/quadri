import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItem, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { QuadriCardChip } from './QuadriCardChip'

export const PlaceCardLog = ({ move, context }: MoveComponentProps<MaterialMove>) => {
  const player = usePlayerName(context.game.rule?.player)
  const item = isMoveItem(move)
    ? new QuadriRules(context.game).material(MaterialType.QuadriCard).getItem(move.itemIndex)
    : undefined
  return (
    <Trans
      i18nKey="log.place-card"
      values={{ player }}
      components={{ card: item ? <QuadriCardChip item={item} /> : <span /> }}
    />
  )
}
