import { css, useTheme } from '@emotion/react'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { RulesDialog, usePlayerId, useRules } from '@gamepark/react-game'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const bold = { bold: <strong /> }

/**
 * Warns the active player, at the start of their turn, that it is their last one:
 * either the last Quadri card is on the table, or the objective pile emptied and this
 * is the final round (competitive). Shown once — closing keeps it closed for that turn.
 */
export const LastTurnDialog = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const rules = useRules<QuadriRules>()
  const me = usePlayerId<number>()

  const isMyTurn = me !== undefined && rules?.game.rule?.player === me
  const lastQuadri = isMyTurn && rules!.isLastQuadriTurn()
  const finalRound = isMyTurn && rules!.isFinalObjectiveRound()
  const isLastTurn = lastQuadri || finalRound

  const [dismissed, setDismissed] = useState(false)
  // Render-time reset: once the last turn is over, forget the dismissal so a fresh game
  // (or a hypothetical second last turn) shows it again. Converges immediately (no effect needed).
  if (!isLastTurn && dismissed) setDismissed(false)

  const close = () => setDismissed(true)

  return (
    <RulesDialog open={isLastTurn && !dismissed} close={close} css={theme.dialog.container}>
      <div css={content}>
        <h2>{t('lastturn.title')}</h2>
        {/* Deck exhaustion is definitive (game ends whatever the objectives), so it takes priority over the final-round message. */}
        <p><Trans i18nKey={lastQuadri ? 'lastturn.quadri' : 'lastturn.objectives'} components={bold} /></p>
        <button css={theme.buttons} onClick={close}>{t('lastturn.ok')}</button>
      </div>
    </RulesDialog>
  )
}

// font-size: 2.4em matches the framework help dialogs (helpDialogContentCss): dialog content
// otherwise inherits a tiny base size and renders far too small in the scaled game space.
const content = css`
  font-size: 2.4em;
  padding: 1.5em 2em;
  text-align: center;
  width: 20em;
  max-width: 80vw;

  > p {
    margin: 1em 0 1.5em;
  }
`
