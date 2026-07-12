import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { ObjectiveCard } from '@gamepark/quadri/material/ObjectiveCard'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { TutorialSetup } from './TutorialSetup'

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 2
  options = {}
  setup = new TutorialSetup()

  players = [
    { id: me },
    {
      id: opponent,
      name: 'Antoine',
      avatar: {
        topType: 'ShortHairShortWaved',
        accessoriesType: 'Blank',
        hairColor: 'BrownDark',
        facialHairType: 'Blank',
        clotheType: 'Hoodie',
        clotheColor: 'Blue02',
        eyeType: 'Default',
        eyebrowType: 'Default',
        mouthType: 'Smile',
        skinColor: 'Light',
      },
    },
  ]

  steps: TutorialStep<number, MaterialType, LocationType>[] = [
    // Étape 1 : Bienvenue
    {
      popup: {
        text: () => <Trans i18nKey="tuto.welcome" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
    },

    // Étape 2 : La table et la carte initiale
    {
      popup: {
        text: () => <Trans i18nKey="tuto.initial-card" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
      focus: (game: MaterialGame<number, MaterialType, LocationType>) => ({
        materials: [
          this.material(game, MaterialType.QuadriCard).location(LocationType.Table),
        ],
        margin: { left: 5, right: 5, top: 20, bottom: 5 },
      }),
    },

    // Étape 3 : La carte révélée (à poser)
    {
      popup: {
        text: () => <Trans i18nKey="tuto.revealed-card" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
      focus: (game: MaterialGame<number, MaterialType, LocationType>) => ({
        materials: [
          this.material(game, MaterialType.QuadriCard).location(LocationType.QuadriReveal)
        ],
        margin: { left: 3, right: 3, top: 3, bottom: 3 },
      }),
    },

    // Étape 4 : Les objectifs — à réaliser en posant les cartes
    {
      popup: {
        text: () => <Trans i18nKey="tuto.objectives" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
      focus: (game: MaterialGame<number, MaterialType, LocationType>) => ({
        materials: [
          this.material(game, MaterialType.ObjectiveCard).location(LocationType.PlayerHand).player(me),
        ],
        margin: { left: 3, right: 3, top: 15, bottom: 3 },
      }),
    },

    // Étape 5 : Poser la carte à (1, 1) sans rotation puis valider — le coin magenta (haut-gauche)
    // doit rester sur la diagonale pour réaliser l'objectif ; toute rotation casserait la diagonale.
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place-card" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
      focus: (game: MaterialGame<number, MaterialType, LocationType>) => ({
        materials: [
          this.material(game, MaterialType.QuadriCard).location(LocationType.Table),
          this.material(game, MaterialType.QuadriCard).location(LocationType.QuadriReveal),
        ],
        margin: { left: 5, right: 5, top: 5, bottom: 5 },
      }),
      move: {
        filter: (move) =>
          isMoveItemType(MaterialType.QuadriCard)(move) &&
          move.location.type === LocationType.Table &&
          move.location.x === 1 &&
          move.location.y === 1 &&
          move.location.rotation === 0,
      },
    },

    // Étape 6 : Antoine pose et valide sa carte à (2, 2) — CheckObjectives score automatiquement
    {
      move: {
        player: opponent,
        filter: (move) =>
          isMoveItemType(MaterialType.QuadriCard)(move) &&
          move.location.type === LocationType.Table &&
          move.location.x === 2 &&
          move.location.y === 2 &&
          move.location.rotation === 0,
      },
    },

    // Étape 7 : Popup — la diagonale magenta est réalisée et scorée automatiquement
    {
      popup: {
        text: () => <Trans i18nKey="tuto.objective-realized" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
    },

    // Étape 11 : Popup après avoir scoré — expliquer la repioche
    {
      popup: {
        text: () => <Trans i18nKey="tuto.new-objective" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
    },

    // Étape 11bis : Focus sur la nouvelle carte piochée — les objectifs se réalisent dans tous les sens, y compris en miroir
    {
      popup: {
        text: () => <Trans i18nKey="tuto.objective-mirror" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
      focus: (game: MaterialGame<number, MaterialType, LocationType>) => ({
        materials: [
          this.material(game, MaterialType.ObjectiveCard).location(LocationType.PlayerHand).player(me).id(ObjectiveCard.Objective27),
        ],
        margin: { left: 3, right: 3, top: 15, bottom: 3 },
      }),
    },

    // Étape 12 : Fin du tutoriel — les conditions de fin de partie, en 3 popups
    {
      popup: {
        text: () => <Trans i18nKey="tuto.end-1" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.end-2" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.end-3" components={{ b: <strong /> }} />,
        position: { x: -20 },
      },
    },
  ]
}
