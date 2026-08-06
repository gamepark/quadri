import { OptionsSpecV2 } from '@gamepark/rules-api'

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
