import { OptionsSpec, OptionsValidationError } from '@gamepark/rules-api'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: number }

/** The three ways to play Quadri. */
export enum GameMode {
  Competitive = 1,
  Cooperative,
  BallTrap
}

/** Difficulty of the cooperative mode, driving which objective values enter the pool. */
export enum CoopDifficulty {
  Easy = 1,   // objectives of value 4 & 5
  Medium,     // + value 6
  Hard        // + value 8
}

export type QuadriOptions = {
  players: PlayerOptions[]
  mode: GameMode
  /** Competitive only: remove value-8 objectives when discovering the game. */
  discovery: boolean
  /** Cooperative only: which objective pool is used. */
  coopDifficulty: CoopDifficulty
}

export const QuadriOptionsSpec: OptionsSpec<QuadriOptions> = {
  players: {
    id: {
      label: (t) => t('player.id'),
      values: [1, 2, 3, 4, 5, 6],
      valueSpec: (id) => ({ label: (t) => t(`player.${id}`) })
    }
  },
  mode: {
    label: (t) => t('option.mode'),
    help: (t) => t('option.mode.help'),
    values: [GameMode.Competitive, GameMode.Cooperative, GameMode.BallTrap],
    valueSpec: (mode) => ({
      label: (t) => t(`option.mode.${mode}`),
      help: (t) => t(`option.mode.${mode}.help`),
      // Only the cooperative mode can be played solo (1 to 6 players).
      solo: mode === GameMode.Cooperative,
      // Ball-trap is limited to 2-4 players.
      hide: mode === GameMode.BallTrap ? (players: number) => players > 4 : undefined
    }),
    competitiveValue: GameMode.Competitive
  },
  discovery: {
    label: (t) => t('option.discovery'),
    help: (t) => t('option.discovery.help'),
    hide: (players) => players > 4
  },
  coopDifficulty: {
    label: (t) => t('option.coop-difficulty'),
    help: (t) => t('option.coop-difficulty.help'),
    values: [CoopDifficulty.Easy, CoopDifficulty.Medium, CoopDifficulty.Hard],
    valueSpec: (difficulty) => ({
      label: (t) => t(`option.coop-difficulty.${difficulty}`)
    })
  },
  competitivePlayers: { min: 2, max: 6 },
  validate: (options, t) => {
    const players = options.players?.length ?? 0
    if (options.mode !== GameMode.Cooperative && players > 4) {
      throw new OptionsValidationError(t('more.than.4.players.require.coop'), ['players'])
    }
    if (options.mode === GameMode.BallTrap && players < 2) {
      throw new OptionsValidationError(t('balltrap.require.2.players'), ['players'])
    }
  }
}
