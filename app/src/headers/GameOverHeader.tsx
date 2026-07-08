import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { usePlayerId, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

export const GameOverHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<QuadriRules>()
  const me = usePlayerId<number>()

  const coopResult = rules?.hasWonCoop()
  if (coopResult === true) return <>{t('coop.victory')}</>
  if (coopResult === false) return <Trans i18nKey="coop.defeat" values={{ count: rules!.getCoopRealisedCount() }} />

  if (rules?.isBallTrap() && me !== undefined) {
    const won = rules.getScore(me) > 0
    return <>{t(won ? 'balltrap.victory' : 'balltrap.defeat')}</>
  }

  return null
}
