import { Player } from "../core/Player.js";
import { GameEngine } from "../core/GameEngine.js";
import { loadMapData } from "../api/dataLoader.js";
import { renderView } from "../components/renderView.js";

/* L'écouteur DOMContentLoaded assure que le code s'exécute une fois le DOM entièrement chargé */
document.addEventListener("DOMContentLoaded", async () => {
  /* Définition de l'état initial.
     On passe mapStatus à 0 pour indiquer que la clé n'a pas encore été trouvée.
     (Une fois trouvée, on passera mapStatus à 1, ce qui permettra ensuite d'ouvrir la porte et sauver Marie.)
  */
  const defaultPlayerState = {
    x: 0,
    y: 0,
    angle: 0,
    mapStatus: 0 /* 0 = clé non trouvée; 1 = clé trouvée (pour débloquer l'action de sauver Marie) */,
  };

  /* Chargement des données de la carte (ou dialogues) depuis le fichier JSON */
  const mapData = await loadMapData();

  /* Instanciation du joueur */
  const player = new Player(defaultPlayerState);

  /* Instanciation du moteur de jeu */
  const gameEngine = new GameEngine({
    player: player,
    mapData: mapData,

    /* Callback pour mettre à jour l'affichage de la vue */
    renderView: renderView,

    /* Callback pour afficher le texte narratif dans la section #text */
    renderText: (narrativeText) => {
      document.getElementById("text").textContent = narrativeText;
    },

    /* Callback pour afficher les actions possibles dans la section #actions */
    renderActions: (actions) => {
      const actionsEl = document.getElementById("actions");
      actionsEl.innerHTML = "";
      actions.forEach((action) => {
        const btn = document.createElement("button");
        btn.textContent = action.label;
        btn.addEventListener("click", () => {
          /* Traite l'action lorsque l'utilisateur clique sur le bouton */
          gameEngine.processAction(action.command);
        });
        actionsEl.appendChild(btn);
      });
    },
  });

  /* Démarre le moteur de jeu */
  gameEngine.start();

  /* Gestion des événements clavier */
  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "KeyQ":
        gameEngine.processAction("turnLeft");
        break;
      case "KeyE":
        gameEngine.processAction("turnRight");
        break;
      case "KeyW":
        gameEngine.processAction("goForward");
        break;
      case "KeyA":
        gameEngine.processAction("goLeft");
        break;
      case "KeyD":
        gameEngine.processAction("goRight");
        break;
      case "KeyS":
        gameEngine.processAction("goBack");
        break;
      case "KeyF":
        gameEngine.processAction("action");
        break;
      case "KeyR":
        gameEngine.resetGame();
        break;
      default:
        break;
    }
  });
});

/* Main.js */
