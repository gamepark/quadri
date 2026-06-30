import { MaterialHelpProps } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

const bold = <strong />
const components = { bold }

export const QuadriCardHelp = (_: MaterialHelpProps) => (
  <>
    <h2><Trans i18nKey="help.quadri-card.title" /></h2>
    <p><Trans i18nKey="help.quadri-card.desc" components={components} /></p>
    <h3><Trans i18nKey="help.quadri-card.placement.title" /></h3>
    <p><Trans i18nKey="help.quadri-card.placement.desc" components={components} /></p>
    <h3><Trans i18nKey="help.quadri-card.rotation.title" /></h3>
    <p><Trans i18nKey="help.quadri-card.rotation.desc" components={components} /></p>
    <h3><Trans i18nKey="help.quadri-card.endgame.title" /></h3>
    <p><Trans i18nKey="help.quadri-card.endgame.desc" components={components} /></p>
  </>
)
