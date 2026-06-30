import { LocationType } from '@gamepark/quadri/material/LocationType'
import { ObjectiveCard } from '@gamepark/quadri/material/ObjectiveCard'
import { objectiveValues } from '@gamepark/quadri/material/ObjectiveCardPattern'
import { MaterialHelpProps } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

const bold = <strong />
const components = { bold }

type Item = Partial<MaterialItem<number, LocationType>>

export const ObjectiveCardHelp = ({ item }: MaterialHelpProps) => {
  const locationType = item.location?.type as LocationType | undefined

  if (locationType === LocationType.CoopObjective) return <CoopObjectiveHelp item={item} />
  if (locationType === LocationType.CoopRealisedObjectives) return <CoopRealisedHelp item={item} />
  if (locationType === LocationType.ScoredObjectives) return <ScoredHelp item={item} />
  if (locationType === LocationType.BallTrapEliminatedObjectives) return <BallTrapEliminatedHelp item={item} />
  if (locationType === LocationType.BallTrapHand) {
    return item.id === undefined ? <BallTrapHiddenHelp /> : <BallTrapOpponentHelp item={item} />
  }
  return <CompetitiveHelp item={item} />
}

const Points = ({ item }: { item: Item }) => {
  if (item.id === undefined) return null
  const points = objectiveValues[item.id as ObjectiveCard]
  return <p><Trans i18nKey="help.objective-card.points" values={{ points }} components={components} /></p>
}

const CompetitiveHelp = ({ item }: { item: Item }) => (
  <>
    <h2><Trans i18nKey="help.objective-card.title" /></h2>
    <Points item={item} />
    <p><Trans i18nKey="help.objective-card.competitive.desc" components={components} /></p>
    <h3><Trans i18nKey="help.objective-card.action.title" /></h3>
    <p><Trans i18nKey="help.objective-card.action.desc" /></p>
    <h3><Trans i18nKey="help.objective-card.endgame.title" /></h3>
    <p><Trans i18nKey="help.objective-card.endgame.competitive" /></p>
  </>
)

const ScoredHelp = ({ item }: { item: Item }) => (
  <>
    <h2><Trans i18nKey="help.objective-card.title" /></h2>
    <Points item={item} />
    <p><Trans i18nKey="help.objective-card.scored.desc" /></p>
  </>
)

const BallTrapHiddenHelp = () => (
  <>
    <h2><Trans i18nKey="help.objective-card.balltrap.title" /></h2>
    <p><Trans i18nKey="help.objective-card.balltrap.hidden.desc" components={components} /></p>
    <h3><Trans i18nKey="help.objective-card.endgame.title" /></h3>
    <p><Trans i18nKey="help.objective-card.endgame.balltrap" components={components} /></p>
  </>
)

const BallTrapOpponentHelp = ({ item }: { item: Item }) => (
  <>
    <h2><Trans i18nKey="help.objective-card.balltrap.title" /></h2>
    <Points item={item} />
    <p><Trans i18nKey="help.objective-card.balltrap.opponent.desc" components={components} /></p>
    <h3><Trans i18nKey="help.objective-card.balltrap.eliminate.title" /></h3>
    <p><Trans i18nKey="help.objective-card.balltrap.eliminate.desc" /></p>
    <h3><Trans i18nKey="help.objective-card.endgame.title" /></h3>
    <p><Trans i18nKey="help.objective-card.endgame.balltrap" components={components} /></p>
  </>
)

const BallTrapEliminatedHelp = ({ item }: { item: Item }) => (
  <>
    <h2><Trans i18nKey="help.objective-card.balltrap.title" /></h2>
    <Points item={item} />
    <p><Trans i18nKey="help.objective-card.balltrap.eliminated.desc" /></p>
    <h3><Trans i18nKey="help.objective-card.endgame.title" /></h3>
    <p><Trans i18nKey="help.objective-card.endgame.balltrap" components={components} /></p>
  </>
)

const CoopObjectiveHelp = ({ item }: { item: Item }) => (
  <>
    <h2><Trans i18nKey="help.objective-card.coop.title" /></h2>
    <Points item={item} />
    <p><Trans i18nKey="help.objective-card.coop.desc" components={components} /></p>
    <h3><Trans i18nKey="help.objective-card.endgame.title" /></h3>
    <p><Trans i18nKey="help.objective-card.endgame.coop" components={components} /></p>
  </>
)

const CoopRealisedHelp = ({ item }: { item: Item }) => (
  <>
    <h2><Trans i18nKey="help.objective-card.coop.title" /></h2>
    <Points item={item} />
    <p><Trans i18nKey="help.objective-card.coop.realised.desc" components={components} /></p>
    <h3><Trans i18nKey="help.objective-card.endgame.title" /></h3>
    <p><Trans i18nKey="help.objective-card.endgame.coop" components={components} /></p>
  </>
)
