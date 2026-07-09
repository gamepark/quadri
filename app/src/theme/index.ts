import { css } from '@emotion/react'
import { defaultTheme, GameTheme } from '@gamepark/react-game'
import background from '../images/background.jpg'
import { colors } from './colors'
import { fontBody, fontDisplay } from './typography'

// ─── Buttons ──────────────────────────────────────────────────────────────────

const buttonBase = css`
  background: transparent !important;
  color: ${colors.cyan} !important;
  border: 0.12em solid ${colors.cyan} !important;
  border-radius: 0.2em !important;
  padding: 0.35em 1em !important;
  font-family: ${fontDisplay};
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 0 0.4em rgba(0, 200, 224, 0.15);
  transition: background 120ms ease, color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  outline: none !important;

  &:hover:not(:disabled),
  &:focus:hover:not(:disabled) {
    background: ${colors.cyan} !important;
    color: ${colors.inkDeep} !important;
    border-color: ${colors.cyanGlow} !important;
    box-shadow: 0 0 0.8em rgba(0, 229, 255, 0.4);
  }

  &:focus:not(:hover):not(:disabled) {
    background: transparent !important;
    color: ${colors.cyanGlow} !important;
    border-color: ${colors.cyanGlow} !important;
    box-shadow: 0 0 0.6em rgba(0, 229, 255, 0.3);
  }

  &:active:not(:disabled) {
    background: ${colors.cyanDeep} !important;
    color: ${colors.paper} !important;
    border-color: ${colors.cyanDeep} !important;
    transform: translateY(0.05em);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`

// ─── Header ───────────────────────────────────────────────────────────────────

const headerBar = css`
  background: rgba(8, 8, 15, 0.95);
  border-bottom: 0.15em solid ${colors.cyan};
  color: ${colors.paper};
  font-family: ${fontDisplay};
  box-shadow: 0 0.1em 0.6em rgba(0, 200, 224, 0.2), 0 0.2em 0.5em rgba(0, 0, 0, 0.7);

  h1 {
    color: ${colors.paper};
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  b, strong {
    color: ${colors.yellow};
  }
`

const headerButtons = css`
  background: transparent !important;
  color: ${colors.paper} !important;
  border: 0.08em solid rgba(240, 240, 236, 0.45) !important;
  border-radius: 0.2em !important;
  font-family: ${fontDisplay};
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.9em;
  cursor: pointer;
  padding: 0 0.5em !important;
  outline: none !important;
  transition: background 120ms ease, color 120ms ease, border-color 120ms ease;

  &:hover:not(:disabled),
  &:focus:hover:not(:disabled) {
    background: ${colors.paper} !important;
    color: ${colors.inkDeep} !important;
    border-color: ${colors.paper} !important;
  }

  &:focus:not(:hover):not(:disabled) {
    background: transparent !important;
    color: ${colors.cyanGlow} !important;
    border-color: ${colors.cyanGlow} !important;
  }

  &:active:not(:disabled) {
    background: ${colors.cyan} !important;
    color: ${colors.inkDeep} !important;
    border-color: ${colors.cyan} !important;
  }
`

// ─── Dialog ───────────────────────────────────────────────────────────────────

const dialogContainer = css`
  background: ${colors.inkPanel};
  box-shadow:
    0 0 0 0.08em ${colors.inkBorder},
    0 0 0 0.18em rgba(220, 0, 200, 0.3),
    0 0.8em 2em rgba(0, 0, 0, 0.8);
  border-radius: 0.4em;

  h2, h3 {
    font-family: ${fontDisplay};
    color: ${colors.paper};
    letter-spacing: 0.05em;
    border-bottom: 0.1em solid ${colors.inkBorder};
    padding-bottom: 0.25em;
  }

  h2 { color: ${colors.magenta}; }
  h3 { color: ${colors.cyan}; }

  p {
    font-family: ${fontBody};
    color: ${colors.paperSoft};
    line-height: 1.55;
  }

  b, strong { color: ${colors.yellow}; font-weight: 700; }
`

// ─── Menu ─────────────────────────────────────────────────────────────────────

const menuPanel = css`
  background: ${colors.inkDeep};
  color: ${colors.paper};
  border: 0.08em solid ${colors.inkBorder};
  box-shadow:
    0 0 0 0.15em rgba(220, 0, 200, 0.25),
    0 0.8em 2em rgba(0, 0, 0, 0.8);
  font-family: ${fontDisplay};

  h2 {
    color: ${colors.magenta};
    border-bottom: 0.12em solid ${colors.inkBorder};
    padding-bottom: 0.3em;
    letter-spacing: 0.05em;
  }
`

const menuMainButton = css`
  background: ${colors.cyan} !important;
  color: ${colors.inkDeep} !important;
  border: 0.12em solid ${colors.cyanGlow} !important;
  font-family: ${fontDisplay};
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 0 0.8em rgba(0, 200, 224, 0.35);

  &:hover:not(:disabled) {
    background: ${colors.cyanGlow} !important;
    color: ${colors.inkDeep} !important;
    box-shadow: 0 0 1.2em rgba(0, 229, 255, 0.5);
  }
`

// ─── Journal / History ────────────────────────────────────────────────────────

const journalHistoryEntry = css`
  background-color: rgba(19, 19, 32, 0.9) !important;
  border: 0.07em solid rgba(0, 200, 224, 0.12) !important;
  border-left: 0.28em solid ${colors.magenta} !important;
  border-radius: 0.2em !important;
  color: ${colors.paper} !important;
  font-family: ${fontBody} !important;
  font-size: 1.05em !important;
  padding: 0.5em 0.8em 0.5em 0.85em !important;
  margin: 0.3em 0 !important;
  box-shadow: 0 0.1em 0.25em rgba(0, 0, 0, 0.45) !important;

  strong, b { color: ${colors.yellow}; font-weight: 700; }
`

// ─── Tutorial ─────────────────────────────────────────────────────────────────

const tutorialContainer = css`
  font-family: ${fontBody};
  color: ${colors.paper};
  background: ${colors.inkDeep};

  h2 {
    font-family: ${fontDisplay};
    color: ${colors.magenta};
    letter-spacing: 0.05em;
  }

  h3 {
    font-family: ${fontDisplay};
    color: ${colors.cyan};
    letter-spacing: 0.05em;
  }

  strong, b { color: ${colors.yellow}; }
`

// ─── Theme export ─────────────────────────────────────────────────────────────

export const theme: GameTheme = {
  ...defaultTheme,
  root: {
    ...defaultTheme.root,
    fontFamily: fontBody,
    background: {
      image: background,
      overlay: 'rgba(0, 0, 0, 0.8)'
    }
  },
  palette: {
    primary: colors.cyan,
    primaryHover: colors.cyanGlow,
    primaryActive: colors.cyanDeep,
    primaryLight: colors.paper,
    primaryLighter: '#F8F8F4',
    surface: colors.inkPanel,
    onSurface: colors.paper,
    onSurfaceFocus: '#1A1A28',
    onSurfaceActive: '#222234',
    danger: colors.magenta,
    dangerHover: '#E820D8',
    dangerActive: colors.magentaDeep,
    disabled: '#44445A'
  },
  buttons: buttonBase,
  header: {
    bar: headerBar,
    buttons: headerButtons
  },
  dialog: {
    ...defaultTheme.dialog,
    backgroundColor: colors.inkPanel,
    color: colors.paper,
    container: dialogContainer,
    buttons: buttonBase
  },
  menu: {
    panel: menuPanel,
    mainButton: menuMainButton
  },
  journal: {
    ...(defaultTheme.journal ?? {}),
    historyEntry: journalHistoryEntry
  },
  playerPanel: {
    activeRingColors: [colors.cyan, colors.magenta]
  },
  tutorial: {
    container: tutorialContainer
  }
}
