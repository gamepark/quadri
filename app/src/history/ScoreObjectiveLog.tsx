import { ObjectiveCard } from '@gamepark/quadri/material/ObjectiveCard'
import { objectiveValues } from '@gamepark/quadri/material/ObjectiveCardPattern'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { ObjectiveCardChip } from './ObjectiveCardChip'

export const ScoreObjectiveLog = ({ move, context }: MaterialLogProps<MoveItem>) => {
  const player = usePlayerName(move.location.player)
  const item = new QuadriRules(context.game).material(MaterialType.ObjectiveCard).getItem(move.itemIndex)
  const revealedId = move.reveal?.id ?? item?.id
  const displayItem = item ? { ...item, id: revealedId } : undefined
  const points = revealedId !== undefined ? objectiveValues[revealedId as ObjectiveCard] : undefined

  if (displayItem && points !== undefined) {
    return (
      <Trans
        i18nKey="log.score-objective"
        values={{ player, points }}
        components={{ card: <ObjectiveCardChip item={displayItem} /> }}
      />
    )
  }
  return <Trans i18nKey="log.score-objective-unknown" values={{ player }} />
}
