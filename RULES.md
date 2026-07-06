# Audit règles — Quadri

Comparaison entre le livret de règles PDF (`app/public/rules-fr.pdf`) et le code dans `rules/src/`.

---

## Matériel

| Règles | Code | Statut |
|--------|------|--------|
| 48 cartes Quadri | 6 types × 8 exemplaires = 48 | ✅ |
| 42 cartes Objectif | 42 entrées dans `ObjectiveCard` enum | ✅ |

---

## Version Compétitive

### Mise en place

| Règles | Code | Statut |
|--------|------|--------|
| 30 cartes Objectif piochées au hasard | `shuffle(pool).slice(0, 30)` | ✅ |
| 3 cartes distribuées à chaque joueur | `deal(..., 3)` dans `dealObjectivesToPlayers()` | ✅ |
| 1 carte Quadri face visible au centre | `placeInitialCard()` → Table x=0,y=0 | ✅ |
| Mode découverte : retirer les cartes valeur 8 | `options.discovery` filtre `objectiveValues[id] < 8` | ✅ |

### Déroulement

| Règles | Code | Statut |
|--------|------|--------|
| Recouvrir 1 à 3 carrés déjà posés | `computeValidPositions` : `overlap >= 1 && overlap <= 3` | ✅ |
| N'importe quel joueur peut scorer à tout moment | `CheckObjectivesRule` (règle **automatique** `MaterialRulesPart`) : après chaque pose, tous les objectifs réalisés de tous les joueurs sont scorés automatiquement — mais uniquement après une pose, pas en cours de tour | ⚠️ |
| Scoring automatique (pas d'action joueur) | `onRuleStart` score les objectifs réalisés, `afterItemMove` pioche le remplaçant, puis `startRule(CheckObjectives)` re-vérifie (un objectif fraîchement pioché peut déjà être réalisé) jusqu'à épuisement, puis passe au joueur suivant | ✅ |
| Toujours 3 objectifs en main | `afterItemMove` → pioche une nouvelle carte après avoir scoré | ✅ |
| Objectifs réalisables dans les 2 sens (miroir) | `getPatternVariants` : 4 rotations × 2 miroirs = 8 variantes | ✅ |

### Fin de partie

| Règles | Code | Statut |
|--------|------|--------|
| Gagnant = plus de points | `CompetitiveScore` + `ScoreHelper.getScore()` (somme des valeurs) | ✅ |
| Égalité = plus d'objectifs complétés | `getTieBreaker(1)` → `getObjectiveCount()` | ✅ |
| Pioche Quadri épuisée → fin de partie immédiate | `PlaceQuadriCardRule.onRuleStart` → pioche vide → `endGame()` | ✅ |
| Quand le dernier ObjectiveCard est pioché, chaque joueur (dont le joueur actif) joue une dernière fois | `Memory.LastPlayer` dans `CheckObjectivesRule` : mémorise le prochain joueur quand la pioche est vide, boucle jusqu'à ce que ce joueur soit à nouveau le suivant → `endGame()` | ✅ |

---

## Version Coopérative

### Mise en place

| Règles | Code | Statut |
|--------|------|--------|
| 20 cartes Quadri (1 sur table + 19 en pioche) | `setupCoopQuadriDeck()` → 20 cartes, `placeInitialCard()` → 1 sur Table | ✅ |
| 10 cartes Objectif de valeur 4 ou 5, face visible en cercle | `setupCoopObjectives()` → valeur 4 ou 5, slice(0, 10) | ✅ |

### Déroulement

| Règles | Code                                                           | Statut |
|--------|----------------------------------------------------------------|--------|
| Tours normaux comme en compétitif | `PlaceQuadriCard` → `RotateAndConfirm` → `CoopCheckObjectives` | ✅ |
| Aucune communication autorisée | Mécanique de jeu sans canal de communication                   | ✅ |
| Quand un objectif est atteint, il est **retourné** (reste visible face cachée) | l'objectif est déplacé face cachée dans une défausse           | ✅ |

### Fin de partie

| Règles | Code | Statut |
|--------|------|--------|
| Victoire : tous les objectifs retournés avant pioche épuisée | `willRemain === 0` → `memorize(CoopWon, true)` + `endGame()` | ✅ |
| Défaite : pioche Quadri épuisée | `PlaceQuadriCardRule.onRuleStart` → pioche vide → `memorize(CoopWon, false)` + `endGame()` | ✅ |

---

## Version Ball-Trap

### Mise en place

| Règles | Code | Statut |
|--------|------|--------|
| 3 cartes (valeur 4 ou 5) par joueur | `dealBallTrapObjectivesToPlayers()` → valeur 4 ou 5 | ✅ |
| Les joueurs ne voient pas leurs propres objectifs | `hideItemIdFromOwner` sur `BallTrapHand` | ✅ |
| Cartes visibles pour les adversaires | `hideItemIdFromOwner` : masque l'id du joueur propriétaire seulement | ✅ |

### Déroulement

| Règles | Code | Statut |
|--------|------|--------|
| Tours normaux comme en compétitif | `PlaceQuadriCard` → `RotateAndConfirm` → `BallTrapCheckObjectives` | ✅ |
| Dès qu'un objectif est réalisé par un autre, on le dépose | `BallTrapCheckRule` (règle **automatique** `MaterialRulesPart`) : tout objectif réalisé sur la table est éliminé automatiquement, crédité au poseur. Transition marquée `unpredictable` (ids cachés au propriétaire) — voir `QuadriRules.isUnpredictableMove` | ✅ |
| Un joueur sans objectif **continue à jouer** | `Memory.NextPlayer` avance normalement ; les joueurs éliminés gardent leurs tours | ✅ |

### Fin de partie

| Règles | Code | Statut |
|--------|------|--------|
| Le dernier avec un objectif en main a gagné | `playersWithObjectives.length <= 1` → `endGame()` ; `getScore = ` nombre d'objectifs encore en main (1 point par objectif restant) | ✅ |

---

---

## Cartes Quadri — cohérence des couleurs

Les 6 types de cartes correspondent aux 6 arrangements distincts de 4 couleurs (cyan, magenta, jaune, noir) à rotation près, avec Magenta toujours en haut-gauche dans l'orientation canonique. Les rotations 0–3 sont gérées par `getColorAt()` dans `colorMap.ts`.

| Type | TL | TR | BL | BR |
|------|----|----|----|----|
| Card1 | M | C | Y | K |
| Card2 | M | C | K | Y |
| Card3 | M | Y | C | K |
| Card4 | M | K | C | Y |
| Card5 | M | K | Y | C |
| Card6 | M | Y | K | C |

6 permutations des 3 couleurs restantes × 8 exemplaires = 48 cartes. ✅

---

## Résumé des problèmes

### ~~🐛 Bug — `ScoredObjectives` sans stratégie de séquencement~~ ✅ Corrigé

`[LocationType.ScoredObjectives]: new PositiveSequenceStrategy()` ajouté dans `QuadriRules.locationsStrategies`.

---

### ~~🗑️ Code mort — `TheFirstStepRule`~~ ✅ Supprimé

`rules/src/rules/TheFirstStepRule.ts` supprimé.

---

### ⚠️ Adaptation numérique — scoring non temps réel

**Règle PDF :** *"À tout moment, même s'il n'est pas le joueur actif, un joueur peut se rendre compte qu'un de ses objectifs est réalisé."*

**Code :** le scoring n'est possible que pendant la phase `CheckObjectivesRule`, déclenchée après chaque validation de pose. Si une pose ultérieure écrase les couleurs qui formaient le motif avant que le joueur n'ait scoré, la fenêtre est perdue (dans la version physique il aurait pu scorer immédiatement).

C'est une adaptation inévitable pour le jeu asynchrone en ligne. Le comportement est cohérent : la phase est simultanée, chaque joueur peut scorer tous ses objectifs réalisés après chaque pose.

---

### ⚠️ Adaptation numérique — fin de partie compétitive : le joueur actif rejoue

**Règle PDF :** *"Lorsqu'un joueur pioche la dernière carte Objectif, chaque joueur, dont le joueur qui était actif à ce moment là, joue une dernière fois."*

**Code :** quand la pioche Objectif se vide pendant `CheckObjectivesRule`, `Memory.LastPlayer` est mis à `nextPlayer` (le joueur qui jouera après). La partie se termine quand `nextPlayer === lastPlayer`, soit après que chaque joueur (y compris le joueur actif qui vient de poser) ait joué un tour supplémentaire. Le joueur actif pose donc deux cartes consécutivement : sa pose normale, puis son "dernier tour".

C'est conforme à la règle ("dont le joueur qui était actif… joue une dernière fois") : la pose qui a déclenché la fin de pioche ne compte pas comme le "dernier tour", le joueur actif en bénéficie comme tous les autres.

---

### ℹ️ Variantes — état d'implémentation

| Variante | Règle PDF | Statut |
|----------|-----------|--------|
| Mode avancé compétitif | *"Retirer les cartes valeur 3, ajouter valeur 8"* | ❌ Retiré : le compétitif n'a plus que le booléen `discovery`. La difficulté progressive est portée par le mode coop. |
| Difficulté coop | *"Ajouter les cartes valeur 6 puis valeur 8"* | ✅ `CoopDifficulty` : Facile `{4,5}` / Moyen `{4,5,6}` / Difficile `{4,5,6,8}` — les deux paliers PDF sont désormais représentés |
| Limite joueurs par mode | PDF : compétitif/ball-trap = 2–4 joueurs, coop = 1–6 | ⏳ En attente de réponse sur la gestion framework |