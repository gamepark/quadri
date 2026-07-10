import '@emotion/react'
import { GameTheme } from '@gamepark/react-game'

// The app's theme is a GameTheme (see theme/index.ts); teach emotion so useTheme() and
// `css={theme => ...}` callbacks are typed instead of returning the empty default Theme.
declare module '@emotion/react' {
  // Augmentation must merge into emotion's `interface Theme` — a type alias can't, so the
  // empty extending interface is required here.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends GameTheme {}
}
