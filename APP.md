# Audit app — Quadri

Comparaison entre le module `app/src/`, les règles PDF (`app/public/rules-fr.pdf`) et la documentation GamePark.

---

## App.tsx

| Élément | État | Statut |
|---------|------|--------|
| `MaterialHeader` avec `rulesStepsHeaders` et `GameOver` | ✓ | ✅ |
| `MaterialImageLoader`, `MaterialGameSounds`, `Menu`, `FailuresDialog`, `FullscreenDialog` | Tous présents | ✅ |
| Gestion du chargement (`LoadingScreen`) | ✓ | ✅ |
| Délai 2 s en prod pour les images | `setTimeout 2000` | ✅ |
| `rulesHelp` (aide contextuelle par phase de règle) | Absent | ℹ️ |

> **ℹ️ `rulesHelp`** : prop optionnelle de `GameProvider` permettant d'afficher une modale d'aide par phase (`RuleId`). Non implémentée — utile pour les jeux à plusieurs modes (compétitif/coop/ball-trap).

---

## GameDisplay.tsx

| Élément | État | Statut |
|---------|------|--------|
| Table dynamique qui s'agrandit autour des cartes posées | `xMin/xMax/yMin/yMax` recalculés depuis `TableCards` | ✅ |
| Ratio 5:3 (100×60) préservé lors de l'agrandissement | Compensation équilibrée sur les deux axes | ✅ |
| Marge droite supprimée (`right: 0`) — panels en overlay | Panels positionnés via `position: fixed` | ✅ |
| `GameTableNavigation`, `DevToolsHub` (dev only) | Présents | ✅ |
| Padding de 15 cm autour de la zone occupée | `padding = 15` | ✅ |

### Système de coordonnées de bord (`edgeOrigin.ts`)

Toutes les positions fixes (pioches, mains, scores) utilisent un système de coordonnées relatives au bord de la table :

- `getEdgeOrigin(absX, absY)` → retourne `OriginType.Min/Max/Center` selon si la position est proche d'un bord (seuil : 15 cm)
- `toEdgeCoords(absX, absY)` → convertit une position absolue en offset depuis l'origine retournée

Ce mécanisme est **compatible avec la table dynamique** : quand la table s'agrandit vers la gauche (nouveau `xMin`), les items ancrés sur `OriginType.Min` se déplacent proportionnellement et restent près du nouveau bord. Les pioches et les mains restent ainsi en périphérie de la zone de jeu même quand le plateau grandit.

---

## Material

### Material.ts

| MaterialType | Description | Statut |
|-------------|-------------|--------|
| `QuadriCard` | `quadriCardDescription` | ✅ |
| `ObjectiveCard` | `objectiveCardDescription` | ✅ |

### QuadriCardDescription.tsx

| Élément | État | Statut |
|---------|------|--------|
| 6 images (card1–card6) pour 6 types de `QuadriCard` | ✓ | ✅ |
| `backImage` défini | ✓ | ✅ |
| Taille `7×7 cm`, `borderRadius 0.3` | ✓ | ✅ |
| `help = QuadriCardHelp` | ✓ | ✅ |
| `isMenuAlwaysVisible` pour `QuadriPending` | ✓ | ✅ |
| Menu rotation gauche/droite sur la carte en attente | Icônes FontAwesome, mouvements filtrés par rotation | ✅ |

### ObjectiveCardDescription.ts

| Élément | État | Statut |
|---------|------|--------|
| 42 images (objectif_01 à objectif_42) | ✓ | ✅ |
| `backImage` défini | ✓ | ✅ |
| Taille `7×7 cm`, `borderRadius 0.3` | ✓ | ✅ |
| `help = ObjectiveCardHelp` | ✓ | ✅ |
| `canShortClick` sur `ScoredObjectives` (compétitif) | ✓ | ✅ |
| `canShortClick` sur `BallTrapEliminatedObjectives` (ball-trap) | ✓ | ✅ |
| `canShortClick` absent sur `CoopObjective` | Correct : objectifs coop scorés automatiquement | ✅ |

### Dialogues d'aide (help dialogs)

| Contexte | Composant | Statut |
|---------|-----------|--------|
| Carte Quadri | `QuadriCardHelp` — description, règle de pose, rotation, fin de partie | ✅ |
| Objectif compétitif (main) | `CompetitiveHelp` — points, description, comment scorer, fin de partie | ✅ |
| Objectif scoré | `ScoredHelp` — confirmé | ✅ |
| Ball-trap (propre objectif caché) | `BallTrapHiddenHelp` — invisibilité, fin de partie | ✅ |
| Ball-trap (objectif adverse visible) | `BallTrapOpponentHelp` — points, comment éliminer, fin de partie | ✅ |
| Ball-trap (éliminé) | `BallTrapEliminatedHelp` — confirmé, fin de partie | ✅ |
| Coop (objectif commun) | `CoopObjectiveHelp` — points, description, fin de partie | ✅ |
| Coop (objectif réalisé) | `CoopRealisedHelp` — confirmé, fin de partie | ✅ |

Tous les contextes de localisation des objectifs sont couverts. ✅

---

## Locators

### Couverture de tous les LocationType

| LocationType | Locator | Statut |
|-------------|---------|--------|
| `QuadriDeck` | `quadriDeckLocator` | ✅ |
| `ObjectiveDeck` | `objectiveDeckLocator` | ✅ |
| `Table` | `tableLocator` | ✅ |
| `QuadriReveal` | `quadriRevealLocator` | ✅ |
| `QuadriPending` | `tableLocator` (partagé avec Table) | ✅ |
| `PlayerHand` | `playerHandLocator` | ✅ |
| `ScoredObjectives` | `scoredObjectivesLocator` | ✅ |
| `CoopObjective` | `coopObjectiveLocator` | ✅ |
| `CoopRealisedObjectives` | `coopRealisedObjectivesLocator` | ✅ |
| `BallTrapHand` | `playerHandLocator` (partagé avec PlayerHand) | ✅ |
| `BallTrapEliminatedObjectives` | `ballTrapEliminatedObjectivesLocator` | ✅ |

Tous les 11 `LocationType` ont un locator. ✅

### Détail des locators

**TableLocator** — `squareSize = 3.5 cm` (carte 7 cm = 2 carrés × 3.5 cm)
- `getItemCoordinates` : x,y en cm + z×0.05 pour l'effet d'empilement ✓
- `getItemRotateZ` : rotation × 90° ✓
- `getLocationIndex` : retourne `location.z` pour l'ordre de drop ✓

**QuadriDeckLocator** — `{x: -40, y: 5}`, `navigationSorts = []` (navigation désactivée sur pioche face cachée) ✓

**QuadriRevealLocator** — `{x: -30, y: 5}` (à côté de la pioche Quadri) ✓

**ObjectiveDeckLocator** — `{x: -40, y: -5}`, `navigationSorts = []` ✓

**PlayerHandLocator** — `HandLocator` avec positions pour 2 à 6 joueurs, `getRelativePlayerIndex` ✓
- `baseAngle` adapté par position (0° bas, 180° haut, 270°/90° côtés)

**ScoredObjectivesLocator** — position = main du joueur - 15 sur x ⚠️ — voir section problèmes

**CoopObjectiveLocator** — 10 objectifs à `y = -25`, espacés de 8 cm, centrés : `x = index×8 − 36` → de −36 à +36 ✓

**BallTrapEliminatedObjectivesLocator** — `{x: -40, y: -5}`, position identique à `ObjectiveDeckLocator`.
Pas de conflit en jeu (modes mutuellement exclusifs). ℹ️

**CoopRealisedObjectivesLocator** — `{x: -40, y: -5}`, même position que la pioche Objectif.
Pas de conflit (mode coop sans pioche Objectif compétitive). ℹ️

---

## Headers

### Headers.tsx — couverture des RuleId

| RuleId | Header | Statut |
|--------|--------|--------|
| `PlaceQuadriCard` | `PlaceQuadriCardHeader` | ✅ |
| `RotateAndConfirm` | `RotateAndConfirmHeader` | ✅ |
| `CheckObjectives` | `CheckObjectivesHeader` | ✅ |
| `CoopCheckObjectives` | `CoopCheckObjectivesHeader` | ✅ |
| `BallTrapCheckObjectives` | `BallTrapCheckHeader` | ✅ |

### Détail des headers

**PlaceQuadriCardHeader** — utilise `rules.game.rule?.player` (pas de legal moves) — "Placez une carte" / "{player} place une carte" ✓

**RotateAndConfirmHeader** — `PlayMoveButton` avec `useLegalMove(isCustomMoveType(ConfirmPlacement))` intégré dans le texte du header — conforme à la doc ✓

**CheckObjectivesHeader** — utilise `rules.game.rule?.players` pour détecter les joueurs actifs — pas de legal moves ✓

**CoopCheckObjectivesHeader** — phase automatique, header fixe "Vérification en cours…" ✓

**BallTrapCheckHeader** — utilise `useLegalMoves()` pour distinguer "rien à éliminer → auto-passe" vs "afficher le message" ⚠️ — voir section problèmes

**QuadriScoring** (`scoring/QuadriScoring.tsx`) — `ScoringDescription` fournie via la prop `scoring` du `GameProvider` (l'ancienne prop dépréciée `MaterialHeader GameOver` est supprimée), donc le bandeau et la popup de résultat restent alignés ✓
- `ResultHeader` — coop (`hasWonCoop()`), ball-trap (`getScore(me) > 0`), compétitif (`resultText` — framework affiche le classement) ✓
- Tableau de scores de la popup — ligne **Score** (`getScore`) pour tous les modes ; en compétitif, ligne supplémentaire **Objectifs** = tie-breaker (`getTieBreaker(1)` = nb d'objectifs réalisés) ✓

**LastTurnDialog** (`dialogs/LastTurnDialog.tsx`) — popup affichée au joueur actif au début de son dernier tour, montée dans `App.tsx`. Déclencheurs (méthodes `QuadriRules`) : `isLastQuadriTurn()` (le joueur ne rejouera plus car la pioche Quadri s'épuise avant son prochain tour → `QuadriDeck.length < nb joueurs`, tous modes — pas seulement la toute dernière carte) ou `isFinalObjectiveRound()` (pile objectifs vide → dernier tour, compétitif via `Memory.LastPlayer`). Affichée une fois, refermée manuellement (state local `dismissed`, reset quand le dernier tour est passé) ✓

---

## PlayerPanels.tsx

| Élément | État | Statut |
|---------|------|--------|
| Score masqué en mode coop et ball-trap | `!isCooperative() && !isBallTrap()` | ✅ |
| Compteur de score en compétitif | Icône dos objectif + `rules.getScore(player.id)` | ✅ |
| `activeRing` sur le joueur actif | ✓ | ✅ |
| Couleurs CMYK (1=Cyan, 2=Magenta, 3=Jaune, 4=Noir) | `cmykColors` dict pour IDs 1-6 | ✅ |
| Positionnement — mode compétitif/ball-trap | `position: fixed` au coin correspondant à la main du joueur | ✅ |
| Positionnement — mode coopératif | Flex row centré en bas de l'écran, 1-6 joueurs | ✅ |

---

## Historique des parties (history/)

| Événement | Composant | Contenu | Statut |
|-----------|-----------|---------|--------|
| Pose d'une carte | `PlaceCardLog` (déclenché sur `ConfirmPlacement`) | Joueur + miniature de la carte | ✅ |
| Score d'un objectif | `ScoreObjectiveLog` | Joueur + miniature + points | ✅ |
| Élimination ball-trap | `EliminateObjectiveLog` | Éliminateur + cible + miniature | ✅ |
| Objectif coop réalisé | `CoopObjectiveLog` | Miniature (depth:1, entrée imbriquée) | ✅ |
| Miniatures cliquables | `QuadriCardChip`, `ObjectiveCardChip` | Ouvrent la modale d'aide | ✅ |

**Gestion des IDs cachés** : `ScoreObjectiveLog` et `EliminateObjectiveLog` utilisent `move.reveal?.id ?? item?.id` pour afficher l'image de l'objectif même quand son ID était masqué avant le mouvement. ✓

**`PlaceCardLog` et `context.game`** : lit la carte en `QuadriPending` depuis `context.game`. Les logs GamePark reçoivent l'état AVANT application du mouvement — `QuadriPending` contient encore la carte à ce moment. ✓

---

## Thème (`theme/`)

Le thème reprend la palette CMYK du jeu pour toutes les surfaces :

| Composant | Détail |
|-----------|--------|
| Boutons | Contour cyan `#00C8E0`, hover fond cyan, uppercase |
| Header | Fond noir, contour bas cyan, `<strong>` jaune `#E0D000` |
| Dialogues d'aide | Fond `inkPanel`, `h2` magenta `#DC00C8`, `h3` cyan, `<strong>` jaune |
| Menu | Fond `inkDeep`, `h2` magenta |
| Historique | Bord gauche magenta, fond semi-transparent |
| Tutorial popup | Fond `inkDeep`, `h2` magenta, `h3` cyan |
| PlayerPanel | `activeRingColors` cyan + magenta |
| Danger (`palette.danger`) | Magenta — cohérent avec le thème mais potentiellement ambigu avec la couleur gameplay magenta | ℹ️ |

---

## GameAnimations.ts

`new MaterialGameAnimations()` sans surcharge — animations par défaut du framework. ✅

---

## Résumé des problèmes

### ~~🐛 Bug — `BallTrapCheckHeader` utilise `useLegalMoves()` dans la logique d'affichage~~ ✅ Corrigé

Remplacé `useLegalMoves()` + check `!hasEliminationMoves` par `useLegalMove(isEndPlayerTurn)` (singulier). La règle retourne déjà soit les moves d'élimination, soit `endPlayerTurn` — jamais les deux — donc la présence du `endTurnMove` suffit à décider l'auto-passe, sans condition supplémentaire sur les moves d'élimination.

Note : `onRuleStart` ne peut pas être utilisé ici car les IDs d'objectifs sont cachés côté client — le serveur et le client produiraient des résultats différents.

---

### ~~⚠️ Layout — `ScoredObjectivesLocator` : placement cassé pour les joueurs latéraux et haut (3+ joueurs)~~ ✅ Corrigé

Les joueurs **côté** (`|y| < 15`, i.e. droite/gauche) poussent maintenant les objectifs scorés vers l'extérieur en x (`sign(x) × 15`) ; les joueurs **haut/bas** gardent l'offset −15 en x.

| Config | Joueur | Main (abs) | Scorés (abs) | Résultat |
|--------|--------|-----------|--------------|---------|
| 2J | local (bas-gauche) | (−30, 24) | (−45, 24) | ✅ bord gauche |
| 2J | adversaire (bas-droite) | (40, 24) | (25, 24) | ✅ milieu droit |
| 4J | joueur droit | (28, 0) | (43, 0) | ✅ bord droit |
| 4J | joueur gauche | (−28, 0) | (−43, 0) | ✅ bord gauche |
| 3J/4J | joueur haut | (0, −22) | (−15, −22) | ✅ bord haut gauche |

---

### ~~⚠️ UX — Joueurs 5 et 6 sans couleur distincte dans `PlayerPanels`~~ ✅ Corrigé

**Fichier :** `app/src/panels/PlayerPanels.tsx`

`cmykColors` ne définit que 4 entrées (IDs 1–4). En mode coopératif à 5 ou 6 joueurs, les joueurs 5 et 6 tombent sur le fallback `cmykColors[1]` (cyan), identique au joueur 1.

**Fix :** ajouter deux couleurs supplémentaires pour les IDs 5 et 6 (ex. blanc `#F0F0EC` et violet `#8800C8`).

---

### ~~ℹ️ UX — Icône de score peu explicite~~ ✅ Corrigé

**Fichier :** `app/src/panels/PlayerPanels.tsx`

Le compteur de score utilise `objBack` (dos d'une carte objectif) comme icône. Pour un nouveau joueur, le lien entre le dos d'une carte et le score en points n'est pas immédiat.

---

### ~~ℹ️ Positions identiques pour des locators distincts~~ ✅ accepté

`BallTrapEliminatedObjectivesLocator`, `CoopRealisedObjectivesLocator` et `ObjectiveDeckLocator` utilisent tous `{x: -40, y: -5}`. Pas de conflit à l'exécution (modes mutuellement exclusifs), mais peut dérouter lors de la maintenance. Un commentaire dans chaque locator suffirait à clarifier.
