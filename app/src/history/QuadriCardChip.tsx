import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { QuadriCard } from '@gamepark/quadri/material/QuadriCard'
import { PlayMoveButton } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { quadriCardDescription } from '../material/QuadriCardDescription.tsx'

type Props = { item: MaterialItem }

export const QuadriCardChip = ({ item }: Props) => {
  const image = item.id !== undefined
    ? quadriCardDescription.images[item.id as QuadriCard]
    : quadriCardDescription.backImage
  if (!image) return null
  return (
    <PlayMoveButton
      move={MaterialMoveBuilder.displayMaterialHelp(MaterialType.QuadriCard, item)}
      transient
      css={chipCss}
    >
      <img src={image} alt="" css={imgCss} />
    </PlayMoveButton>
  )
}

const chipCss = css`
  display: inline-block;
  width: 1.8em;
  height: 1.8em;
  border-radius: 0.2em;
  margin: 0 0.15em;
  vertical-align: -0.5em;
  overflow: hidden;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: 0 0.05em 0.2em rgba(0, 0, 0, 0.4);
  cursor: pointer;
  &:hover { transform: scale(1.08); opacity: 1 !important; }
`

const imgCss = css`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`
