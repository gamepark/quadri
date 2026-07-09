import { OriginType } from '@gamepark/react-game'
import { GameMode } from '@gamepark/quadri/QuadriOptions'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'

/**
 * Shared layout for the whole game: a vertical "menu" column pinned to the LEFT edge of the table,
 * the play zone (Quadri cards) filling the space on the right.
 *
 * Coordinate convention for every element of the left column:
 *  - origin { x: Min, y: Center } → the column is anchored to the table's left edge and vertically centered.
 *  - getCoordinates() returns x measured rightward from the left edge, y measured downward from the center.
 *
 * Because everything (column + play zone) lives in the same table coordinate space, it all scales together
 * as the play zone grows (see GameDisplay).
 */

/** Card / objective-card side (cm). */
export const CARD = 7

/** Player panels are rendered at their natural size, then scaled down to fit the sidebar. */
export const PANEL_SCALE = 0.55
const PANEL_NATURAL_W = 28
export const PANEL_W = PANEL_NATURAL_W * PANEL_SCALE // ≈ 15.4
/** Approximate scaled height of a panel (natural ≈ 9cm). Used only for row spacing. */
const PANEL_H = 9 * PANEL_SCALE // ≈ 5

const PAD = 1.5 // outer padding of the column
const GAP = 1.5 // gap between adjacent blocks
const SECTION_GAP = 3 // gap between the players block and the deck row

/** Competitive rows are tall: panel on top, hand to its right, scored objectives hanging below the panel. */
const COMP_ROW_H = 13
/** Ball-trap rows hold only a panel + its hand (no scored pile), so they stay card-height. */
const BALLTRAP_ROW_H = Math.max(PANEL_H, CARD) + 1.5 // ≈ 8.5
/** In coop the panels have no cards beside them, so they stack tightly at panel height. */
const COOP_ROW_H = PANEL_H + 1.5 // ≈ 6.5
/** Vertical pitch of the panel rows for a given mode. */
const rowHeight = (mode: GameMode) =>
  mode === GameMode.Cooperative ? COOP_ROW_H : mode === GameMode.BallTrap ? BALLTRAP_ROW_H : COMP_ROW_H

/** Ball-trap / competitive coop objectives grid: 2 columns of 5. */
const COOP_COLS = 2
const COOP_ROWS = 5
const COOP_GAP = 1
const coopBlockW = COOP_COLS * CARD + (COOP_COLS - 1) * COOP_GAP // 15
const coopBlockH = COOP_ROWS * CARD + (COOP_ROWS - 1) * COOP_GAP // 39

// --- Horizontal anchors (x from left edge) -------------------------------------------------------
/** Panel left edge (panels are positioned by their own left edge, then scaled from left-center). */
export const PANEL_LEFT = PAD
const PANEL_RIGHT = PANEL_LEFT + PANEL_W
/** Center of a player's hand fan (competitive & ball-trap), pushed clear of the panel to its left. */
export const HAND_X = PANEL_RIGHT + GAP + 9
/** Center of a player's scored-objectives pile (competitive): under the panel. */
export const SCORED_X = PANEL_LEFT + PANEL_W / 2
/** Left edge of the coop shared-objectives grid (2×5). */
export const COOP_OBJ_LEFT = PANEL_RIGHT + GAP

// Deck row (below everything): Quadri deck, drawn card, then the mode's shared objective pile.
export const DECK_X = PANEL_LEFT + CARD / 2
export const REVEAL_X = DECK_X + CARD + GAP
export const PILE_X = REVEAL_X + CARD + GAP + CARD / 2

// Competitive deck row: objective deck under the panels (their X), Quadri deck + drawn card under the
// hands (centered on the hand X).
const compObjectiveDeckX = SCORED_X
const compQuadriDeckX = HAND_X - (CARD + GAP) / 2
const compRevealX = HAND_X + (CARD + GAP) / 2

const competitiveContentRight = HAND_X + 8 // hand fan right edge (≈ fan reach + card half)
const coopContentRight = COOP_OBJ_LEFT + coopBlockW
const deckRowRight = PILE_X + CARD / 2

// --- Vertical layout (y from center, downward positive) ------------------------------------------

const playersBlockHeight = (playerCount: number, mode: GameMode) => playerCount * rowHeight(mode)

// Content block = the tallest stacked material of the mode. Coop is driven by the 2×5 objectives grid
// (the tight panel stack fits beside it); competitive & ball-trap by the player rows.
const contentHeight = (playerCount: number, mode: GameMode) =>
  mode === GameMode.Cooperative ? coopBlockH : playersBlockHeight(playerCount, mode)

// Every mode adds a deck row below the content block.
const totalHeight = (playerCount: number, mode: GameMode) => contentHeight(playerCount, mode) + SECTION_GAP + CARD

/** Top of the column (offset from the vertical center). */
const columnTop = (playerCount: number, mode: GameMode) => -totalHeight(playerCount, mode) / 2

// First-row offset: coop panels align to the top of the objectives grid (card height); competitive &
// ball-trap rows are centered on their taller, card-driven pitch.
const firstRowOffset = (mode: GameMode) => (mode === GameMode.Cooperative ? CARD / 2 : rowHeight(mode) / 2)

/** Vertical center of player row `index` (0 = local player, at the top). */
export const rowCenterY = (index: number, playerCount: number, mode: GameMode) =>
  columnTop(playerCount, mode) + firstRowOffset(mode) + index * rowHeight(mode)

const rowTop = (index: number, playerCount: number, mode: GameMode) =>
  columnTop(playerCount, mode) + index * rowHeight(mode)

/**
 * Vertical center of a player's panel. Competitive puts it at the top of its tall row so the scored
 * objectives can hang below it; coop & ball-trap center it on their row.
 */
export const panelCenterY = (index: number, playerCount: number, mode: GameMode) =>
  mode === GameMode.Competitive
    ? rowTop(index, playerCount, mode) + PANEL_H / 2
    : rowCenterY(index, playerCount, mode)

/** Vertical center of a player's hand (competitive & ball-trap). */
export const handCenterY = (index: number, playerCount: number, mode: GameMode) =>
  mode === GameMode.Competitive ? rowTop(index, playerCount, mode) + CARD / 2 : rowCenterY(index, playerCount, mode)

/** Vertical center of a player's scored-objectives pile (competitive): just below the panel, sticking out under it. */
export const scoredCenterY = (index: number, playerCount: number) =>
  rowTop(index, playerCount, GameMode.Competitive) + PANEL_H + CARD / 2

/** Center of a coop objective card by its sequence index (0..9): 2 columns of 5, first row aligned with the first panel. */
export const coopObjectiveCenter = (index: number, playerCount: number) => {
  const col = Math.floor(index / COOP_ROWS)
  const row = index % COOP_ROWS
  const firstRowCenter = rowCenterY(0, playerCount, GameMode.Cooperative)
  return {
    x: COOP_OBJ_LEFT + CARD / 2 + col * (CARD + COOP_GAP),
    y: firstRowCenter + row * (CARD + COOP_GAP),
  }
}

/** Vertical center of the deck row, below the content block in every mode. */
export const deckRowY = (playerCount: number, mode: GameMode) =>
  columnTop(playerCount, mode) + contentHeight(playerCount, mode) + SECTION_GAP + CARD / 2

// Coop deck row sits under the shared objectives grid: Quadri deck + drawn card under the two grid columns,
// with the realised-objectives pile to the left of the Quadri deck.
const coopDeckX = COOP_OBJ_LEFT + CARD / 2
const coopRevealX = coopDeckX + CARD + COOP_GAP
const coopRealisedX = coopDeckX - CARD - GAP

/** Center of the Quadri deck spot. Coop: under the objectives grid; competitive: under the hands; ball-trap: far left. */
export const quadriDeckCenter = (playerCount: number, mode: GameMode) => ({
  x: mode === GameMode.Cooperative ? coopDeckX : mode === GameMode.Competitive ? compQuadriDeckX : DECK_X,
  y: deckRowY(playerCount, mode),
})

/** Center of the drawn Quadri card (the one to place). */
export const quadriRevealCenter = (playerCount: number, mode: GameMode) => ({
  x: mode === GameMode.Cooperative ? coopRevealX : mode === GameMode.Competitive ? compRevealX : REVEAL_X,
  y: deckRowY(playerCount, mode),
})

/** Competitive objective draw pile, under the panels (below the scored piles). */
export const objectiveDeckCenter = (playerCount: number) => ({
  x: compObjectiveDeckX,
  y: deckRowY(playerCount, GameMode.Competitive),
})

/** Coop realised-objectives pile, to the left of the Quadri deck. */
export const coopRealisedCenter = (playerCount: number) => ({
  x: coopRealisedX,
  y: deckRowY(playerCount, GameMode.Cooperative),
})

/** Overall size of the left column, used by GameDisplay to reserve space on the left. */
export const columnMetrics = (playerCount: number, mode: GameMode) => ({
  width:
    mode === GameMode.Cooperative
      ? coopContentRight + PAD
      : Math.max(competitiveContentRight, deckRowRight) + PAD,
  height: totalHeight(playerCount, mode),
})

/** Read the current game mode from the rules. */
export const getMode = (rules: QuadriRules): GameMode =>
  rules.isCooperative() ? GameMode.Cooperative : rules.isBallTrap() ? GameMode.BallTrap : GameMode.Competitive

/** Origin shared by every element of the left column: pinned to the left edge, vertically centered. */
export const columnOrigin = { x: OriginType.Min, y: OriginType.Center }
