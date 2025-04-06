# Architecture de l'Application "Le Petit Bac"

Ce document explique simplement l'organisation et le rôle de chaque partie de l'application.

## 🎮 Composants Principaux

### `App.tsx`
Le cerveau de l'application qui :
- Gère le déroulement global du jeu
- Affiche les différents écrans (menu, jeu, résultats)
- Coordonne les interactions entre les joueurs

### `WaitingRoom`
La salle d'attente où :
- Les joueurs se rejoignent avant de commencer
- L'hôte peut gérer les participants
- Les joueurs indiquent qu'ils sont prêts

### `ScoreBoard`
Le tableau des scores qui :
- Affiche les résultats de chaque joueur
- Montre le classement final
- Permet de voir l'historique des réponses

## 👥 Gestion des Joueurs

### `PlayerInfo`
Affiche les informations d'un joueur :
- Son nom
- Son statut (hôte, prêt, en attente)
- Son score

### `PlayerActions`
Les actions possibles sur un joueur :
- Transférer le rôle d'hôte
- Exclure un joueur
- Bannir un joueur

### `PlayerHistoryModal`
L'historique détaillé d'un joueur :
- Ses réponses à chaque manche
- Ses scores par manche
- Le nombre de mots valides

## 🎲 Logique du Jeu

### `useGameRoom` (dans hooks)
Gère toute la communication avec le serveur :
- Création et rejoindre une salle
- Synchronisation des joueurs
- Mise à jour de l'état du jeu

### `utils/game.ts`
Les règles et calculs du jeu :
- Génération des lettres
- Calcul des scores
- Validation des réponses

## 📝 Types et Données

### `types/`
Définit la structure des données :
- `game.ts` : Paramètres du jeu
- `player.ts` : Informations des joueurs
- `room.ts` : État des salles
- `round.ts` : Déroulement des manches
- `history.ts` : Historique des parties

### `constants/categories.ts`
Liste des catégories disponibles dans le jeu

## 🎨 Interface Utilisateur

### `ui/`
Les composants réutilisables :
- `Button` : Boutons stylisés
- `Input` : Champs de saisie
- `Modal` : Fenêtres de dialogue

## 🔥 Base de Données (Firebase)

### `firebase.ts`
Configuration et connexion à la base de données

## Comment tout fonctionne ensemble ?

1. Un joueur crée une partie depuis l'écran principal
2. D'autres joueurs rejoignent via un code
3. Dans la salle d'attente, tous se préparent
4. Le jeu commence avec des manches successives
5. Les joueurs proposent des mots pour chaque catégorie
6. Les scores sont calculés et affichés
7. L'historique est sauvegardé pour consultation

Cette organisation permet de :
- Facilement ajouter de nouvelles fonctionnalités
- Maintenir le code propre et compréhensible
- Séparer les différentes responsabilités
- Réutiliser les composants quand nécessaire