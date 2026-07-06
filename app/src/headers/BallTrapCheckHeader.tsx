import { useTranslation } from 'react-i18next'

// BallTrapCheck is an automatic rule (realised objectives are eliminated automatically),
// so this header is only shown briefly, if at all, while it resolves.
export const BallTrapCheckHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.balltrap-check')}</>
}
