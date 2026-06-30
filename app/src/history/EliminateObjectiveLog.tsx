import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { ObjectiveCardChip } from './ObjectiveCardChip'

export const EliminateObjectiveLog = ({ move, context }: MaterialLogProps<MoveItem>) => {
  const eliminator = usePlayerName(move.location.player)
  const item = new QuadriRules(context.game).material(MaterialType.ObjectiveCard).getItem(move.itemIndex)
  const displayItem = item ? { ...item, id: move.reveal?.id ?? item.id } : undefined
  const target = usePlayerName(item?.location.player)

  return (
    <Trans
      i18nKey="log.eliminate-objective"
      values={{ eliminator, target }}
      components={{ card: displayItem ? <ObjectiveCardChip item={displayItem} /> : <span /> }}
    />
  )
}
