import { OptionsSpec, OptionsSpecV2, OptionsValidationError } from '@gamepark/rules-api'

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

/**
 * What Quadri is: one mode question, one difficulty question, and a table size
 * that decides which modes are on the table at all.
 *
 * The mode restrictions are the whole of what `validate` used to say — the
 * cooperative mode is the only one that goes below two players or above four —
 * expressed here as availability rather than as a rejection. Declared this way
 * the platform stops offering a mode the table size rules out, instead of
 * accepting the answer and refusing it at creation.
 *
 * `difficulty` is asked for every mode, ball-trap included, exactly as v1 did.
 * The mode ignores it, but narrowing it here would be a rules change smuggled
 * into a migration.
 */
export const QuadriOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 1, max: 6 },
  options: {
    mode: {
      kind: 'enum',
      values: [
        { value: GameMode.Competitive, playerCount: { min: 2, max: 4 } },
        GameMode.Cooperative,
        { value: GameMode.BallTrap, playerCount: { min: 2, max: 4 } }
      ]
    },
    difficulty: { kind: 'enum', values: [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard] }
  }
}

/**
 * The legacy declaration, superseded by `QuadriOptionsSpecV2`.
 *
 * Kept exported only because a few platform screens still read the v1 spec for
 * its labels; nothing here should be edited any more, and the whole object goes
 * once those screens have moved.
 *
 * The `solo` and `hide` flags inside `valueSpec` never did anything: the
 * platform read those two flags on whole options, never on individual values,
 * so what actually held the mode restrictions was `validate` alone. They are
 * left untouched as the dead metadata they always were — `QuadriOptionsSpecV2`
 * is what states the rule now.
 */
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
