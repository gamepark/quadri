import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { MaterialLogProps } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { ObjectiveCardChip } from './ObjectiveCardChip'

export const CoopObjectiveLog = ({ move, context }: MaterialLogProps<MoveItem>) => {
  const item = new QuadriRules(context.game).material(MaterialType.ObjectiveCard).getItem(move.itemIndex)
  return (
    <Trans
      i18nKey="log.coop-objective-realised"
      components={{ card: item ? <ObjectiveCardChip item={item} /> : <span /> }}
    />
  )
}
