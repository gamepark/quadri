import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { ScoringDescription, ScoringValue, usePlayerId, useResultText, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

type ScoringKey = 'score' | 'objectives'

// Header shown both in the game-over banner and as the result popup title, so the two stay aligned.
const QuadriResultHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<QuadriRules>()
  const me = usePlayerId<number>()
  // Default winner/score text used by competitive mode (and as a spectator fallback).
  const resultText = useResultText()

  const coopResult = rules?.hasWonCoop()
  if (coopResult === true) return <>{t('coop.victory')}</>
  if (coopResult === false) return <Trans i18nKey="coop.defeat" values={{ count: rules!.getCoopRealisedCount() }} />

  if (rules?.isBallTrap() && me !== undefined) {
    const won = rules.getScore(me) > 0
    return <>{t(won ? 'balltrap.victory' : 'balltrap.defeat')}</>
  }

  return <>{resultText}</>
}

// Row labels are translated at render time, so the header is returned as a component.
const ScoringRowHeader = ({ scoringKey }: { scoringKey: ScoringKey }) => {
  const { t } = useTranslation()
  return <>{t(scoringKey === 'score' ? 'scoring.score' : 'scoring.objectives')}</>
}

export class QuadriScoring implements ScoringDescription<number, QuadriRules, ScoringKey> {
  getScoringKeys(rules: QuadriRules): ScoringKey[] {
    // A single score line; competitive mode adds the tie-breaker (number of objectives realised).
    if (rules.isCooperative() || rules.isBallTrap()) return ['score']
    return ['score', 'objectives']
  }

  getScoringHeader(key: ScoringKey): ScoringValue {
    return <ScoringRowHeader scoringKey={key} />
  }

  getScoringPlayerData(key: ScoringKey, player: number, rules: QuadriRules): ScoringValue | null {
    if (key === 'objectives') return rules.getTieBreaker(1, player) ?? null
    return rules.getScore(player)
  }

  ResultHeader = QuadriResultHeader
}
