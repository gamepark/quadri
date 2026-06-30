import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const GameOverHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<QuadriRules>()

  const coopResult = rules?.hasWonCoop()
  if (coopResult === true) return <>{t('coop.victory')}</>
  if (coopResult === false) return <>{t('coop.defeat')}</>
  return null
}
