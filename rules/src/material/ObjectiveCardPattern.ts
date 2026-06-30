import { ObjectiveCard } from './ObjectiveCard'
import { QuadriColor } from './QuadriColor'

export type ObjectiveSquare = { x: number; y: number; color: QuadriColor }
export type ObjectivePattern = ObjectiveSquare[]

const C = QuadriColor.Cyan
const M = QuadriColor.Magenta
const Y = QuadriColor.Yellow
const K = QuadriColor.Black

export const objectivePatterns: Record<ObjectiveCard, ObjectivePattern> = {
  // --- 8 pts ---
  [ObjectiveCard.Objective1]: [
    // Y K K Y
    // _ K K _
    // _ M M _
    { x: 0, y: 0, color: Y }, { x: 1, y: 0, color: K }, { x: 2, y: 0, color: K }, { x: 3, y: 0, color: Y },
    { x: 1, y: 1, color: K }, { x: 2, y: 1, color: K },
    { x: 1, y: 2, color: M }, { x: 2, y: 2, color: M },
  ],
  [ObjectiveCard.Objective2]: [
    // _ _ _ C K
    // K Y _ C _
    // _ Y M M _
    { x: 3, y: 0, color: C }, { x: 4, y: 0, color: K },
    { x: 0, y: 1, color: K }, { x: 1, y: 1, color: Y }, { x: 3, y: 1, color: C },
    { x: 1, y: 2, color: Y }, { x: 2, y: 2, color: M }, { x: 3, y: 2, color: M },
  ],
  // --- 3 pts ---
  [ObjectiveCard.Objective3]: [
    // K _ K
    // _ K _
    { x: 0, y: 0, color: K }, { x: 2, y: 0, color: K },
    { x: 1, y: 1, color: K },
  ],
  // --- 4 pts: 2×2 blocks ---
  [ObjectiveCard.Objective4]: [
    { x: 0, y: 0, color: M }, { x: 1, y: 0, color: M },
    { x: 0, y: 1, color: M }, { x: 1, y: 1, color: M },
  ],
  [ObjectiveCard.Objective5]: [
    { x: 0, y: 0, color: Y }, { x: 1, y: 0, color: Y },
    { x: 0, y: 1, color: Y }, { x: 1, y: 1, color: Y },
  ],
  [ObjectiveCard.Objective6]: [
    { x: 0, y: 0, color: C }, { x: 1, y: 0, color: C },
    { x: 0, y: 1, color: C }, { x: 1, y: 1, color: C },
  ],
  [ObjectiveCard.Objective7]: [
    { x: 0, y: 0, color: K }, { x: 1, y: 0, color: K },
    { x: 0, y: 1, color: K }, { x: 1, y: 1, color: K },
  ],
  // --- 4 pts: S-tetrominoes ---
  [ObjectiveCard.Objective8]: [
    // _ M
    // M _
    // M M
    { x: 1, y: 0, color: M },
    { x: 0, y: 1, color: M },
    { x: 0, y: 2, color: M }, { x: 1, y: 2, color: M }
  ],
  // --- 6 pts ---
  [ObjectiveCard.Objective9]: [
    // K K K K
    // _ C _ C
    { x: 0, y: 0, color: K }, { x: 1, y: 0, color: K }, { x: 2, y: 0, color: K }, { x: 3, y: 0, color: K },
    { x: 1, y: 1, color: C }, { x: 3, y: 1, color: C },
  ],
  // --- 4 pts: 1×4 lines ---
  [ObjectiveCard.Objective10]: [
    { x: 0, y: 0, color: C }, { x: 1, y: 0, color: C }, { x: 2, y: 0, color: C }, { x: 3, y: 0, color: C },
  ],
  [ObjectiveCard.Objective11]: [
    { x: 0, y: 0, color: Y }, { x: 1, y: 0, color: Y }, { x: 2, y: 0, color: Y }, { x: 3, y: 0, color: Y },
  ],
  [ObjectiveCard.Objective12]: [
    { x: 0, y: 0, color: M }, { x: 1, y: 0, color: M }, { x: 2, y: 0, color: M }, { x: 3, y: 0, color: M },
  ],
  [ObjectiveCard.Objective13]: [
    { x: 0, y: 0, color: K }, { x: 1, y: 0, color: K }, { x: 2, y: 0, color: K }, { x: 3, y: 0, color: K },
  ],
  // --- 5 pts: plus signs ---
  [ObjectiveCard.Objective14]: [
    // _ Y _
    // Y Y Y
    // _ Y _
    { x: 1, y: 0, color: Y },
    { x: 0, y: 1, color: Y }, { x: 1, y: 1, color: Y }, { x: 2, y: 1, color: Y },
    { x: 1, y: 2, color: Y },
  ],
  [ObjectiveCard.Objective15]: [
    { x: 1, y: 0, color: C },
    { x: 0, y: 1, color: C }, { x: 1, y: 1, color: C }, { x: 2, y: 1, color: C },
    { x: 1, y: 2, color: C },
  ],
  [ObjectiveCard.Objective16]: [
    { x: 1, y: 0, color: M },
    { x: 0, y: 1, color: M }, { x: 1, y: 1, color: M }, { x: 2, y: 1, color: M },
    { x: 1, y: 2, color: M },
  ],
  // --- 5 pts: L + accent ---
  [ObjectiveCard.Objective17]: [
    // _ M Y
    // M M _
    // _ M _
    { x: 1, y: 0, color: M }, { x: 2, y: 0, color: Y },
    { x: 0, y: 1, color: M }, { x: 1, y: 1, color: M },
    { x: 1, y: 2, color: M },
  ],
  [ObjectiveCard.Objective18]: [
    // _ C Y
    // C C _
    // _ C _
    { x: 1, y: 0, color: C }, { x: 2, y: 0, color: Y },
    { x: 0, y: 1, color: C }, { x: 1, y: 1, color: C },
    { x: 1, y: 2, color: C },
  ],
  [ObjectiveCard.Objective19]: [
    // _ K Y
    // K K _
    // _ K _
    { x: 1, y: 0, color: K }, { x: 2, y: 0, color: Y },
    { x: 0, y: 1, color: K }, { x: 1, y: 1, color: K },
    { x: 1, y: 2, color: K },
  ],
  [ObjectiveCard.Objective20]: [
    // _ Y K
    // Y Y _
    // _ Y _
    { x: 1, y: 0, color: Y }, { x: 2, y: 0, color: K },
    { x: 0, y: 1, color: Y }, { x: 1, y: 1, color: Y },
    { x: 1, y: 2, color: Y },
  ],
  // --- 6 pts ---
  [ObjectiveCard.Objective21]: [
    // K K K K
    // M _ _ M
    { x: 0, y: 0, color: K }, { x: 1, y: 0, color: K }, { x: 2, y: 0, color: K }, { x: 3, y: 0, color: K },
    { x: 0, y: 1, color: M }, { x: 3, y: 1, color: M },
  ],
  [ObjectiveCard.Objective22]: [
    // K Y C
    // K Y C
    { x: 0, y: 0, color: K }, { x: 1, y: 0, color: Y }, { x: 2, y: 0, color: C },
    { x: 0, y: 1, color: K }, { x: 1, y: 1, color: Y }, { x: 2, y: 1, color: C },
  ],
  // --- 4 pts: S-tetrominoes ---
  [ObjectiveCard.Objective23]: [
    // _ C
    // C _
    // C C
    { x: 1, y: 0, color: C },
    { x: 0, y: 1, color: C },
    { x: 0, y: 2, color: C }, { x: 1, y: 2, color: C }
  ],
  [ObjectiveCard.Objective24]: [
    // Y C K M  (all 4 colors in a row)
    { x: 0, y: 0, color: Y }, { x: 1, y: 0, color: C }, { x: 2, y: 0, color: K }, { x: 3, y: 0, color: M },
  ],
  [ObjectiveCard.Objective25]: [
    // _ Y
    // Y _
    // Y Y
    { x: 1, y: 0, color: Y },
    { x: 0, y: 1, color: Y },
    { x: 0, y: 2, color: Y }, { x: 1, y: 2, color: Y }
  ],
  // --- 6 pts ---
  [ObjectiveCard.Objective26]: [
    // _ _ _ C
    // Y Y Y Y
    // C _ _ _
    { x: 3, y: 0, color: C },
    { x: 0, y: 1, color: Y }, { x: 1, y: 1, color: Y }, { x: 2, y: 1, color: Y }, { x: 3, y: 1, color: Y },
    { x: 0, y: 2, color: C },
  ],
  [ObjectiveCard.Objective27]: [
    // C C C C
    // _ Y _ _
    // _ _ M _
    { x: 0, y: 0, color: C }, { x: 1, y: 0, color: C }, { x: 2, y: 0, color: C }, { x: 3, y: 0, color: C },
    { x: 1, y: 1, color: Y },
    { x: 2, y: 2, color: M },
  ],
  // --- 5 pts ---
  [ObjectiveCard.Objective28]: [
    // K K K
    // _ Y _
    // _ _ Y
    { x: 0, y: 0, color: K }, { x: 1, y: 0, color: K }, { x: 2, y: 0, color: K },
    { x: 1, y: 1, color: Y },
    { x: 2, y: 2, color: Y },
  ],
  // --- 4 pts ---
  [ObjectiveCard.Objective29]: [
    // C _
    // C _
    // C Y
    { x: 0, y: 0, color: C },
    { x: 0, y: 1, color: C },
    { x: 0, y: 2, color: C }, { x: 1, y: 2, color: Y },
  ],
  // --- 6 pts ---
  [ObjectiveCard.Objective30]: [
    // K _ _ K
    // _ Y Y _
    // _ M M _
    { x: 0, y: 0, color: K }, { x: 3, y: 0, color: K },
    { x: 1, y: 1, color: Y }, { x: 2, y: 1, color: Y },
    { x: 1, y: 2, color: M }, { x: 2, y: 2, color: M },
  ],
  // --- 5 pts: mixed-center cross ---
  [ObjectiveCard.Objective31]: [
    // _ Y _
    // Y M Y
    // _ Y _
    { x: 1, y: 0, color: Y },
    { x: 0, y: 1, color: Y }, { x: 1, y: 1, color: M }, { x: 2, y: 1, color: Y },
    { x: 1, y: 2, color: Y },
  ],
  [ObjectiveCard.Objective32]: [
    // _ C _
    // C M C
    // _ C _
    { x: 1, y: 0, color: C },
    { x: 0, y: 1, color: C }, { x: 1, y: 1, color: M }, { x: 2, y: 1, color: C },
    { x: 1, y: 2, color: C },
  ],
  // --- 5 pts: W shape ---
  [ObjectiveCard.Objective33]: [
    // _ K K _ _
    // K _ _ K K
    { x: 1, y: 0, color: K }, { x: 2, y: 0, color: K },
    { x: 0, y: 1, color: K }, { x: 3, y: 1, color: K }, { x: 4, y: 1, color: K },
  ],
  // --- 8 pts ---
  [ObjectiveCard.Objective34]: [
    // _ Y K _
    // Y Y Y K
    // _ Y K _
    { x: 1, y: 0, color: Y }, { x: 2, y: 0, color: K },
    { x: 0, y: 1, color: Y }, { x: 1, y: 1, color: Y }, { x: 2, y: 1, color: Y }, { x: 3, y: 1, color: K },
    { x: 1, y: 2, color: Y }, { x: 2, y: 2, color: K },
  ],
  // --- 6 pts: T + feet ---
  [ObjectiveCard.Objective35]: [
    // _ M _
    // M M M
    // K _ K
    { x: 1, y: 0, color: M },
    { x: 0, y: 1, color: M }, { x: 1, y: 1, color: M }, { x: 2, y: 1, color: M },
    { x: 0, y: 2, color: K }, { x: 2, y: 2, color: K },
  ],
  [ObjectiveCard.Objective36]: [
    // _ C _
    // C C C
    // Y _ Y
    { x: 1, y: 0, color: C },
    { x: 0, y: 1, color: C }, { x: 1, y: 1, color: C }, { x: 2, y: 1, color: C },
    { x: 0, y: 2, color: Y }, { x: 2, y: 2, color: Y },
  ],
  // --- 4 pts: inverted T ---
  [ObjectiveCard.Objective37]: [
    // _ K _
    // K Y K
    { x: 1, y: 0, color: K },
    { x: 0, y: 1, color: K }, { x: 1, y: 1, color: Y }, { x: 2, y: 1, color: K },
  ],
  [ObjectiveCard.Objective38]: [
    // _ Y _
    // Y K Y
    { x: 1, y: 0, color: Y },
    { x: 0, y: 1, color: Y }, { x: 1, y: 1, color: K }, { x: 2, y: 1, color: Y },
  ],
  // --- 8 pts ---
  [ObjectiveCard.Objective39]: [
    // _ C _ _
    // C M C _
    // _ C M C
    // _ _ C _
    { x: 1, y: 0, color: C },
    { x: 0, y: 1, color: C }, { x: 1, y: 1, color: M }, { x: 2, y: 1, color: C },
    { x: 1, y: 2, color: C }, { x: 2, y: 2, color: M }, { x: 3, y: 2, color: C },
    { x: 2, y: 3, color: C },
  ],
  // --- 3 pts ---
  [ObjectiveCard.Objective40]: [
    // K _ K _ K  (3 blacks spaced by 1)
    { x: 0, y: 0, color: K }, { x: 2, y: 0, color: K }, { x: 4, y: 0, color: K },
  ],
  [ObjectiveCard.Objective41]: [
    // _ _ M
    // _ M _
    // M _ _
    { x: 2, y: 0, color: M },
    { x: 1, y: 1, color: M },
    { x: 0, y: 2, color: M },
  ],
  [ObjectiveCard.Objective42]: [
    // C _ _
    // _ C _
    // _ _ C
    { x: 0, y: 0, color: C },
    { x: 1, y: 1, color: C },
    { x: 2, y: 2, color: C },
  ],
}

export const objectiveValues: Record<ObjectiveCard, number> = {
  [ObjectiveCard.Objective1]: 8,
  [ObjectiveCard.Objective2]: 8,
  [ObjectiveCard.Objective3]: 3,
  [ObjectiveCard.Objective4]: 4,
  [ObjectiveCard.Objective5]: 4,
  [ObjectiveCard.Objective6]: 4,
  [ObjectiveCard.Objective7]: 4,
  [ObjectiveCard.Objective8]: 4,
  [ObjectiveCard.Objective9]: 6,
  [ObjectiveCard.Objective10]: 4,
  [ObjectiveCard.Objective11]: 4,
  [ObjectiveCard.Objective12]: 4,
  [ObjectiveCard.Objective13]: 4,
  [ObjectiveCard.Objective14]: 5,
  [ObjectiveCard.Objective15]: 5,
  [ObjectiveCard.Objective16]: 5,
  [ObjectiveCard.Objective17]: 5,
  [ObjectiveCard.Objective18]: 5,
  [ObjectiveCard.Objective19]: 5,
  [ObjectiveCard.Objective20]: 5,
  [ObjectiveCard.Objective21]: 6,
  [ObjectiveCard.Objective22]: 6,
  [ObjectiveCard.Objective23]: 4,
  [ObjectiveCard.Objective24]: 4,
  [ObjectiveCard.Objective25]: 4,
  [ObjectiveCard.Objective26]: 6,
  [ObjectiveCard.Objective27]: 6,
  [ObjectiveCard.Objective28]: 5,
  [ObjectiveCard.Objective29]: 4,
  [ObjectiveCard.Objective30]: 6,
  [ObjectiveCard.Objective31]: 5,
  [ObjectiveCard.Objective32]: 5,
  [ObjectiveCard.Objective33]: 5,
  [ObjectiveCard.Objective34]: 8,
  [ObjectiveCard.Objective35]: 6,
  [ObjectiveCard.Objective36]: 6,
  [ObjectiveCard.Objective37]: 4,
  [ObjectiveCard.Objective38]: 4,
  [ObjectiveCard.Objective39]: 8,
  [ObjectiveCard.Objective40]: 3,
  [ObjectiveCard.Objective41]: 3,
  [ObjectiveCard.Objective42]: 3,
}
