import { css } from '@emotion/react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { ObjectiveCard } from '@gamepark/quadri/material/ObjectiveCard'
import { objectivePatterns } from '@gamepark/quadri/material/ObjectiveCardPattern'
import { buildColorMap } from '@gamepark/quadri/rules/colorMap'
import { Memory } from '@gamepark/quadri/rules/Memory'
import { isObjectiveRealized } from '@gamepark/quadri/rules/objectiveCheck'
import { CardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { ObjectiveCardHelp } from './help/ObjectiveCardHelp'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import obj01 from '../images/objectifs/objectif_01.jpg'
import obj02 from '../images/objectifs/objectif_02.jpg'
import obj03 from '../images/objectifs/objectif_03.jpg'
import obj04 from '../images/objectifs/objectif_04.jpg'
import obj05 from '../images/objectifs/objectif_05.jpg'
import obj06 from '../images/objectifs/objectif_06.jpg'
import obj07 from '../images/objectifs/objectif_07.jpg'
import obj08 from '../images/objectifs/objectif_08.jpg'
import obj09 from '../images/objectifs/objectif_09.jpg'
import obj10 from '../images/objectifs/objectif_10.jpg'
import obj11 from '../images/objectifs/objectif_11.jpg'
import obj12 from '../images/objectifs/objectif_12.jpg'
import obj13 from '../images/objectifs/objectif_13.jpg'
import obj14 from '../images/objectifs/objectif_14.jpg'
import obj15 from '../images/objectifs/objectif_15.jpg'
import obj16 from '../images/objectifs/objectif_16.jpg'
import obj17 from '../images/objectifs/objectif_17.jpg'
import obj18 from '../images/objectifs/objectif_18.jpg'
import obj19 from '../images/objectifs/objectif_19.jpg'
import obj20 from '../images/objectifs/objectif_20.jpg'
import obj21 from '../images/objectifs/objectif_21.jpg'
import obj22 from '../images/objectifs/objectif_22.jpg'
import obj23 from '../images/objectifs/objectif_23.jpg'
import obj24 from '../images/objectifs/objectif_24.jpg'
import obj25 from '../images/objectifs/objectif_25.jpg'
import obj26 from '../images/objectifs/objectif_26.jpg'
import obj27 from '../images/objectifs/objectif_27.jpg'
import obj28 from '../images/objectifs/objectif_28.jpg'
import obj29 from '../images/objectifs/objectif_29.jpg'
import obj30 from '../images/objectifs/objectif_30.jpg'
import obj31 from '../images/objectifs/objectif_31.jpg'
import obj32 from '../images/objectifs/objectif_32.jpg'
import obj33 from '../images/objectifs/objectif_33.jpg'
import obj34 from '../images/objectifs/objectif_34.jpg'
import obj35 from '../images/objectifs/objectif_35.jpg'
import obj36 from '../images/objectifs/objectif_36.jpg'
import obj37 from '../images/objectifs/objectif_37.jpg'
import obj38 from '../images/objectifs/objectif_38.jpg'
import obj39 from '../images/objectifs/objectif_39.jpg'
import obj40 from '../images/objectifs/objectif_40.jpg'
import obj41 from '../images/objectifs/objectif_41.jpg'
import obj42 from '../images/objectifs/objectif_42.jpg'
import objBack from '../images/objectifs/objectif_dos.jpg'

class ObjectiveCardDescription extends CardDescription {
  width = 7
  height = 7
  borderRadius = 0.3
  help = ObjectiveCardHelp

  images = {
    [ObjectiveCard.Objective1]: obj01,
    [ObjectiveCard.Objective2]: obj02,
    [ObjectiveCard.Objective3]: obj03,
    [ObjectiveCard.Objective4]: obj04,
    [ObjectiveCard.Objective5]: obj05,
    [ObjectiveCard.Objective6]: obj06,
    [ObjectiveCard.Objective7]: obj07,
    [ObjectiveCard.Objective8]: obj08,
    [ObjectiveCard.Objective9]: obj09,
    [ObjectiveCard.Objective10]: obj10,
    [ObjectiveCard.Objective11]: obj11,
    [ObjectiveCard.Objective12]: obj12,
    [ObjectiveCard.Objective13]: obj13,
    [ObjectiveCard.Objective14]: obj14,
    [ObjectiveCard.Objective15]: obj15,
    [ObjectiveCard.Objective16]: obj16,
    [ObjectiveCard.Objective17]: obj17,
    [ObjectiveCard.Objective18]: obj18,
    [ObjectiveCard.Objective19]: obj19,
    [ObjectiveCard.Objective20]: obj20,
    [ObjectiveCard.Objective21]: obj21,
    [ObjectiveCard.Objective22]: obj22,
    [ObjectiveCard.Objective23]: obj23,
    [ObjectiveCard.Objective24]: obj24,
    [ObjectiveCard.Objective25]: obj25,
    [ObjectiveCard.Objective26]: obj26,
    [ObjectiveCard.Objective27]: obj27,
    [ObjectiveCard.Objective28]: obj28,
    [ObjectiveCard.Objective29]: obj29,
    [ObjectiveCard.Objective30]: obj30,
    [ObjectiveCard.Objective31]: obj31,
    [ObjectiveCard.Objective32]: obj32,
    [ObjectiveCard.Objective33]: obj33,
    [ObjectiveCard.Objective34]: obj34,
    [ObjectiveCard.Objective35]: obj35,
    [ObjectiveCard.Objective36]: obj36,
    [ObjectiveCard.Objective37]: obj37,
    [ObjectiveCard.Objective38]: obj38,
    [ObjectiveCard.Objective39]: obj39,
    [ObjectiveCard.Objective40]: obj40,
    [ObjectiveCard.Objective41]: obj41,
    [ObjectiveCard.Objective42]: obj42,
  }

  backImage = objBack

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    if (!isMoveItemType(MaterialType.ObjectiveCard)(move)) return false
    if (move.itemIndex !== context.index) return false
    return move.location.type === LocationType.ScoredObjectives
      || move.location.type === LocationType.BallTrapEliminatedObjectives
  }

  isFlippedOnTable(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    return item.location?.type === LocationType.ObjectiveDeck || super.isFlippedOnTable(item, context)
  }

  // While a Quadri card is previewed (placed but not yet validated), an active objective becomes
  // realized only because of that preview: the check rules always clear realized objectives after
  // each validation, so any objective realized during preview is one the placement would complete.
  private isRealizedByPreview(item: MaterialItem, context: ItemContext): boolean {
    // No preview in progress → nothing to foreshadow.
    if (context.rules.remind(Memory.QuadriPreview) === undefined) return false
    // Only objectives still in play, and visible to the viewer (hidden cards have no id):
    // my hand (competitive), the others' hands (ball trap), or the shared objectives (coop).
    if (item.id === undefined) return false
    const location = item.location.type
    if (location !== LocationType.PlayerHand
      && location !== LocationType.BallTrapHand
      && location !== LocationType.CoopObjective) return false
    // The previewed card already sits on the Table in the local state, so the color map includes it.
    const tableCards = context.rules.material(MaterialType.QuadriCard).location(LocationType.Table).getItems()
    return isObjectiveRealized(objectivePatterns[item.id as ObjectiveCard], buildColorMap(tableCards))
  }

  isMenuAlwaysVisible(item: MaterialItem, context: ItemContext): boolean {
    return this.isRealizedByPreview(item, context)
  }

  getItemMenu(item: MaterialItem, context: ItemContext) {
    if (!this.isRealizedByPreview(item, context)) return undefined
    return <div css={checkOverlayCss}>
      <FontAwesomeIcon icon={faCheck} />
    </div>
  }
}

const checkOverlayCss = css`
  transform: translate(-50%, -50%) translateZ(0.5em);
  width: 3.2em;
  height: 3.2em;
  border-radius: 50%;
  background-color: rgba(52, 208, 88, 0.95);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7em;
  border: 0.12em solid white;
  box-shadow: 0 0 0.9em rgba(52, 208, 88, 0.75);
  pointer-events: none;
`

export const objectiveCardDescription = new ObjectiveCardDescription()
