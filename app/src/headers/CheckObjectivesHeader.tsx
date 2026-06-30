import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { usePlayerId, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const CheckObjectivesHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<QuadriRules>()
  const me = usePlayerId()
  const activePlayers: number[] = rules?.game.rule?.players ?? []
  const isActive = me !== undefined && activePlayers.includes(me)

  if (isActive) {
    return <>{t('header.check-objectives.mine')}</>
  }
  return <>{t('header.check-objectives.other')}</>
}
