import { OptionsSpec, OptionsValidationError } from '@gamepark/rules-api'
/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: number }

export type QuadriOptions = {
  players: PlayerOptions[]
  cooperative: boolean
  advancedCooperative: boolean
  balltrap: boolean
  discoveryMode: boolean
  advancedMode: boolean
}

export const QuadriOptionsSpec: OptionsSpec<QuadriOptions> = {
  players: {
    id: {
      label: (t) => t('player.id'),
      values: [1, 2, 3, 4, 5, 6],
      valueSpec: (id) => ({ label: (t) => t(`player.${id}`) })
    }
  },
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
  competitivePlayers: { min: 2, max: 6 },
  validate: (options, t) => {
    const players = options.players?.length ?? 0
    const isCoop = (options.cooperative || options.advancedCooperative) ?? false
    if (!isCoop && players > 4) {
      throw new OptionsValidationError(t('more.than.4.players.require.coop'), ['players'])
    }
  }
}
