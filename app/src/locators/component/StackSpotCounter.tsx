import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { useRules } from '@gamepark/react-game'

export function createStackSpotCounter(materialType: MaterialType, locationType: LocationType) {
  return function StackSpotCounter() {
    const rules = useRules<QuadriRules>()!
    const count = rules.material(materialType).location(locationType).length
    if (count === 0) return null
    return <span>{count}</span>
  }
}
