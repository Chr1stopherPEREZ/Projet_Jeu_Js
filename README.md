# :pencil2: Projet_Jeu_JS

Un petit jeu de labyrinthe en JavaScript natif. Votre mission : retrouver la clé, rien qu’une clé, pour ouvrir la porte et sauver Marie !

Projet développé par [Christopher PEREZ](https://github.com/Chr1stopherPerez), en réponse à un brief proposé durant ma formation à [SIMPLON](https://www.simplon.co/).

## Contexte & Objectif

À l’occasion d’un salon du jeu vidéo, notre studio voulait un jeu d’appoint : un labyrinthe en POO JavaScript, manipulant le DOM pour l’affichage.
Vous contrôlez un héros enfermé dans un couloir sombre : réussirez-vous à trouver la clé dorée cachée dans un vase, puis à ouvrir la porte pour sauver Marie ?

## Règles du Jeu

1. **Se déplacer** dans un couloir en 4 directions (avant, arrière, gauche, droite).
2. **Tourner** votre vue à gauche ou à droite (90°) pour explorer tous les recoins.
3. **Trouver** et **casser** le vase (`F` / bouton “Casser”) pour récupérer la clé dorée.
4. **Revenir** à la porte (coordonnées 0,1, angle 180).
5. **Cliquer** sur “Ouvrir” (`F`) **une seule fois** pour libérer Marie.
6. **Fin aléatoire** : à chaque ouverture, l’écran de fin est choisi **au hasard** parmi 5 variantes.

## Contrôles Clavier

| Touche | Action                 |
| :----: | :--------------------- |
|  `Z`   | Avancer                |
|  `S`   | Reculer                |
|  `Q`   | Tourner à gauche       |
|  `D`   | Tourner à droite       |
|  `A`   | Aller à gauche         |
|  `E`   | Aller à droite         |
|  `F`   | Action (Casser/Ouvrir) |
|  `R`   | Reset / Recommencer    |

## Lancer le Projet

1. **Cloner** le dépôt
   ```bash
   git clone https://github.com/MonStudio/jeu-labyrinthe-js.git
   ```
2. **Ouvrir** `index.html` dans votre navigateur (Chrome, Firefox, Edge…).
3. **Jouer** !
   - À la fin, un seul bouton **Reset** vous permet de recommencer.

## Structure du Projet

```
/
├─ index.html        # Page principale
├─ src/
│  ├─ assets/
│  │  └─ images/     # Captures du labyrinthe & fins aléatoires
│  ├─ core/
│  │  ├─ Player.js    # Classe Player
│  │  └─ GameEngine.js# Logique du jeu et UI
│  ├─ api/
│  │  └─ dataLoader.js# Chargement du JSON
│  ├─ css/
│  │  └─ styles.css   # Styles & fond animé
│  └─ js/
│     └─ main.js      # Initialisation, render, events clavier
└─ map.json       # JSON décrivant la carte et fins
```

## Technologies & Méthodologie

- **HTML5 & CSS3** pour la structure et l’animation de fond.
- **JavaScript natif (ES6+)** pour la logique, la POO et la gestion du DOM.
- **JSON** pour décrire dynamiquement la carte et les fins.
- **Principes DRY** et code commenté pour une maintenance facilitée.

## Crédits & Licences

Les images utilisées dans ce projet sont la propriété de leurs auteurs respectifs :  
mango3st | The-Gamer-Within | TheImperialCombine | ImAFutureGuitarHero | lemonface2001  
Elles sont reproduites ici **à titre illustratif** et ne m’appartiennent pas.  
Tous droits réservés aux détenteurs originaux des images.

## Améliorations Futures

- Bouton **Règles** pour réafficher ces instructions en jeu.
- Barre de progression ou timer pour ajouter du challenge.
- Sonorisation et thématisation (bruits d’ambiance, musique).
