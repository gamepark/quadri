import { OptionsSpec } from '@gamepark/rules-api'

export type QuadriOptions = {
  cooperative: boolean
  advancedCooperative: boolean
  balltrap: boolean
  discoveryMode: boolean
  advancedMode: boolean
}

export const QuadriOptionsSpec: OptionsSpec<QuadriOptions> = {
  cooperative: {
    label: (t) => t('option.cooperative'),
    help: (t) => t('option.cooperative.help'),
    solo: true
  },
  advancedCooperative: {
    label: (t) => t('option.advanced.cooperative'),
    help: (t) => t('option.advanced.cooperative.help'),
    solo: true
  },
  balltrap: {
    label: (t) => t('option.balltrap'),
    help: (t) => t('option.balltrap.help'),
    hide: (players) => players > 4
  },
  discoveryMode: {
    label: (t) => t('option.discovery'),
    help: (t) => t('option.discovery.help'),
    hide: (players) => players > 4
  },
  advancedMode: {
    label: (t) => t('option.advanced'),
    help: (t) => t('option.advanced.help'),
    hide: (players) => players > 4
  },
  competitivePlayers: { min: 2, max: 6 }
}
