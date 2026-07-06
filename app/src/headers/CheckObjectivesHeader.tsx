import { useTranslation } from 'react-i18next'

// CheckObjectives is an automatic rule (realised objectives are scored automatically),
// so this header is only shown briefly, if at all, while it resolves.
export const CheckObjectivesHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.check-objectives')}</>
}
