import { QuadriCard } from './QuadriCard'

export enum QuadriColor {
  Cyan = 1,
  Magenta,
  Yellow,
  Black,
}

// Color layout per card: [TopLeft, TopRight, BottomLeft, BottomRight]
export const quadriCardColors: Record<QuadriCard, [QuadriColor, QuadriColor, QuadriColor, QuadriColor]> = {
  [QuadriCard.Card1]: [QuadriColor.Magenta, QuadriColor.Cyan, QuadriColor.Yellow, QuadriColor.Black],
  [QuadriCard.Card2]: [QuadriColor.Magenta, QuadriColor.Cyan, QuadriColor.Black, QuadriColor.Yellow],
  [QuadriCard.Card3]: [QuadriColor.Magenta, QuadriColor.Yellow, QuadriColor.Cyan, QuadriColor.Black],
  [QuadriCard.Card4]: [QuadriColor.Magenta, QuadriColor.Black, QuadriColor.Cyan, QuadriColor.Yellow],
  [QuadriCard.Card5]: [QuadriColor.Magenta, QuadriColor.Black, QuadriColor.Yellow, QuadriColor.Cyan],
  [QuadriCard.Card6]: [QuadriColor.Magenta, QuadriColor.Yellow, QuadriColor.Black, QuadriColor.Cyan],
}
