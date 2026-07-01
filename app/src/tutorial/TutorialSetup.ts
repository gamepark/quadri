import { QuadriOptions } from '@gamepark/quadri/QuadriOptions'
import { QuadriSetup } from '@gamepark/quadri/QuadriSetup'
import { LocationType } from '@gamepark/quadri/material/LocationType'
import { MaterialType } from '@gamepark/quadri/material/MaterialType'
import { ObjectiveCard } from '@gamepark/quadri/material/ObjectiveCard'
import { QuadriCard } from '@gamepark/quadri/material/QuadriCard'

export class TutorialSetup extends QuadriSetup {
  setupMaterial(_options: QuadriOptions) {
    // Objectifs joueur 1 (moi) : Objective41 (diagonale M, 3 pts) + 2 leurres
    this.material(MaterialType.ObjectiveCard).createItems([
      { id: ObjectiveCard.Objective41, location: { type: LocationType.PlayerHand, player: 1 } },
      { id: ObjectiveCard.Objective5, location: { type: LocationType.PlayerHand, player: 1 } },
      { id: ObjectiveCard.Objective10, location: { type: LocationType.PlayerHand, player: 1 } },
    ])

    // Objectifs adversaire (Antoine, joueur 2)
    this.material(MaterialType.ObjectiveCard).createItems([
      { id: ObjectiveCard.Objective42, location: { type: LocationType.PlayerHand, player: 2 } },
      { id: ObjectiveCard.Objective6, location: { type: LocationType.PlayerHand, player: 2 } },
      { id: ObjectiveCard.Objective15, location: { type: LocationType.PlayerHand, player: 2 } },
    ])

    // Pioche d'objectifs (pour piocher après avoir scoré)
    this.material(MaterialType.ObjectiveCard).createItems(
      [
        ObjectiveCard.Objective3, ObjectiveCard.Objective4, ObjectiveCard.Objective7,
        ObjectiveCard.Objective8, ObjectiveCard.Objective9, ObjectiveCard.Objective11,
        ObjectiveCard.Objective12, ObjectiveCard.Objective13, ObjectiveCard.Objective14,
        ObjectiveCard.Objective16, ObjectiveCard.Objective17, ObjectiveCard.Objective18,
        ObjectiveCard.Objective19, ObjectiveCard.Objective20, ObjectiveCard.Objective21,
        ObjectiveCard.Objective22, ObjectiveCard.Objective23, ObjectiveCard.Objective24,
        ObjectiveCard.Objective25, ObjectiveCard.Objective26, ObjectiveCard.Objective27,
      ].map(id => ({ id, location: { type: LocationType.ObjectiveDeck } }))
    )

    // Pioche de cartes Quadri (ordre important : dernière créée = sommet de la pile)
    // Cartes de remplissage (tirées après le tutoriel guidé)
    this.material(MaterialType.QuadriCard).createItems(
      Array.from({ length: 20 }, (_, i) => ({
        id: ((i % 6) + 1) as QuadriCard,
        location: { type: LocationType.QuadriDeck },
      }))
    )
    // Carte d'Antoine pour son 1er tour (2e depuis le sommet)
    this.material(MaterialType.QuadriCard).createItems([
      { id: QuadriCard.Card1, location: { type: LocationType.QuadriDeck } },
    ])
    // Carte du joueur pour son 1er tour (sommet de la pile, piochée en premier)
    this.material(MaterialType.QuadriCard).createItems([
      { id: QuadriCard.Card1, location: { type: LocationType.QuadriDeck } },
    ])

    // Carte initiale sur la table (Card1 rotation 0 : M-C-J-N)
    this.material(MaterialType.QuadriCard).createItems([
      { id: QuadriCard.Card1, location: { type: LocationType.Table, x: 0, y: 0 } },
    ])
  }
}
