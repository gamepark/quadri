import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { CustomMoveType } from '@gamepark/quadri/rules/CustomMoveType'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { TutorialSetup } from './TutorialSetup'

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 1
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
        position: { y: -20 },
      },
    },

    // Étape 2 : La table et la carte initiale
    {
      popup: {
        text: () => <Trans i18nKey="tuto.initial-card" components={{ b: <strong /> }} />,
        position: { y: -20 },
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
      },
      focus: (game: MaterialGame<number, MaterialType, LocationType>) => ({
        materials: [
          this.material(game, MaterialType.QuadriCard).location(LocationType.QuadriReveal),
          this.material(game, MaterialType.QuadriCard).location(LocationType.Table),
        ],
        margin: { left: 3, right: 3, top: 3, bottom: 3 },
      }),
    },

    // Étape 4 : Poser la carte à (1, 1) — dans la continuité de la carte révélée
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place-card" components={{ b: <strong /> }} />,
        position: { y: 15 },
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
          move.location.type === LocationType.QuadriPending &&
          move.location.x === 1 &&
          move.location.y === 1,
      },
    },

    // Étape 5 : Les objectifs — pendant que la carte est en attente de validation
    {
      popup: {
        text: () => <Trans i18nKey="tuto.objectives" components={{ b: <strong /> }} />,
        position: { y: -15 },
      },
      focus: (game: MaterialGame<number, MaterialType, LocationType>) => ({
        materials: [
          this.material(game, MaterialType.ObjectiveCard).location(LocationType.PlayerHand).player(me),
        ],
        margin: { left: 3, right: 3, top: 15, bottom: 3 },
      }),
    },

    // Étape 6 : Valider la pose (rotation présentée dans le texte, sans guider le move de rotation)
    {
      popup: {
        text: () => <Trans i18nKey="tuto.confirm" components={{ b: <strong /> }} />,
      },
      focus: (game: MaterialGame<number, MaterialType, LocationType>) => ({
        materials: [
          this.material(game, MaterialType.QuadriCard).location(LocationType.Table),
          this.material(game, MaterialType.QuadriCard).location(LocationType.QuadriReveal),
          this.material(game, MaterialType.QuadriCard).location(LocationType.QuadriPending),
        ],
        margin: { left: 5, right: 5, top: 5, bottom: 5 },
      }),
      move: {
        filter: (move) => isCustomMoveType(CustomMoveType.ConfirmPlacement)(move),
      },
    },

    // Étape 8 : Antoine place sa carte à (2, 2)
    {
      move: {
        player: opponent,
        filter: (move) =>
          isMoveItemType(MaterialType.QuadriCard)(move) &&
          move.location.type === LocationType.QuadriPending &&
          move.location.x === 2 &&
          move.location.y === 2,
      },
    },

    // Étape 9 : Antoine valide — CheckObjectives démarre automatiquement après
    {
      move: {
        player: opponent,
        filter: (move) => isCustomMoveType(CustomMoveType.ConfirmPlacement)(move),
      },
    },

    // Étape 10 : Popup avant scoring — Antoine auto-passe, joueur 1 est actif dans CheckObjectives
    {
      popup: {
        text: () => <Trans i18nKey="tuto.objective-realized" components={{ b: <strong /> }} />,
        position: { y: -20 },
      },
      move: {
        filter: (move) =>
          isMoveItemType(MaterialType.ObjectiveCard)(move) &&
          move.location.type === LocationType.ScoredObjectives,
      },
    },

    // Étape 11 : Popup après avoir scoré — expliquer la repigche
    {
      popup: {
        text: () => <Trans i18nKey="tuto.new-objective" components={{ b: <strong /> }} />,
      },
    },

    // Étape 12 : Fin du tutoriel
    {
      popup: {
        text: () => <Trans i18nKey="tuto.end" components={{ b: <strong /> }} />,
      },
    },
  ]
}
