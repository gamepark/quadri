import { css } from '@emotion/react'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { useRules } from '@gamepark/react-game'

// The deck shows at most 20 cards (DeckLocator.limit), each offset by 0.05cm up-left (DeckLocator.gap).
// The location spot sits at the MIDDLE of that stack (ListLocator.getAreaCoordinates = base + maxGap/2),
// so the top card's lower-right corner is half the total stacking delta up-left of the spot's corner.
const MAX_SHOWN = 20
const CARD_GAP = 0.05
const CORNER_INSET = 0.4 // margin from the top card's corner (cm)

export function createStackSpotCounter(materialType: MaterialType, locationType: LocationType) {
  return function StackSpotCounter() {
    const rules = useRules<QuadriRules>()!
    const count = rules.material(materialType).location(locationType).length
    if (count === 0) return null
    const halfDelta = ((Math.min(count, MAX_SHOWN) - 1) * CARD_GAP) / 2
    const offset = halfDelta + CORNER_INSET
    return (
      <span css={badge} style={{ right: `${offset}em`, bottom: `${offset}em` }}>
        <span css={number}>{count}</span>
      </span>
    )
  }
}

// No font-size on the anchor: its `em` stays in table units so `right`/`bottom` are true cm offsets.
// translateZ lifts the badge above the stacked deck cards (each card sits at z = index * 0.05).
const badge = css`
  position: absolute;
  transform: translateZ(5em);
`

// Just the number in a dark colour (the card corner is always white there, so no outline is needed).
const number = css`
  display: inline-block;
  font-size: 1.6em;
  font-weight: bolder;
  line-height: 1;
  color: #08080f;
`
