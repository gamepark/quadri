import { useTranslation } from 'react-i18next'

export const CoopCheckObjectivesHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.coop-check')}</>
}
