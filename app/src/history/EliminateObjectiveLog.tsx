import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { ObjectiveCardChip } from './ObjectiveCardChip'

export const EliminateObjectiveLog = ({ move, context }: MaterialLogProps<MoveItem>) => {
  // Pile is shared (no owner): the eliminator is the active player, the target is the objective's owner
  // (context.game is the pre-move state, so the card is still in its owner's BallTrapHand).
  const eliminator = usePlayerName(context.game.rule?.player)
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
