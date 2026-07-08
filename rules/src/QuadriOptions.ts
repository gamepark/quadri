import { OptionsSpec, OptionsValidationError } from '@gamepark/rules-api'

/** The three ways to play Quadri. */
export enum GameMode {
  Competitive = 1,
  Cooperative,
  BallTrap
}

/** Difficulty shared by the competitive and cooperative modes, driving which objective values enter the pool. */
export enum Difficulty {
  Easy = 1,   // objectives of value 3, 4 & 5
  Medium,     // + value 6
  Hard        // + value 8
}

/** Highest objective value allowed in the pool for a given difficulty. */
export const difficultyMaxValue = (difficulty: Difficulty): number =>
  difficulty === Difficulty.Hard ? 8 : difficulty === Difficulty.Medium ? 6 : 5

export type QuadriOptions = {
  players: number
  mode: GameMode
  /** Competitive & cooperative: which objective values enter the pool. */
  difficulty: Difficulty
}

export const QuadriOptionsSpec: OptionsSpec<QuadriOptions> = {
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
  difficulty: {
    label: (t) => t('option.difficulty'),
    help: (t) => t('option.difficulty.help'),
    values: [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard],
    valueSpec: (difficulty) => ({
      label: (t) => t(`option.difficulty.${difficulty}`)
    })
  },
  competitivePlayers: { min: 2, max: 6 },
  validate: (options, t) => {
    const players = options.players ?? 1
    if (options.mode !== GameMode.Cooperative && players > 4) {
      throw new OptionsValidationError(t('more.than.4.players.require.coop'), ['players'])
    }
    if (options.mode !== GameMode.Cooperative && players < 2) {
      throw new OptionsValidationError(t('less.than.2.players.require.coop'), ['players'])
    }
  }
}
