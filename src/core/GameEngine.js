export class GameEngine {
  constructor({ player, mapData, renderView, renderText, renderActions }) {
    this.player = player;
    this.mapData = mapData;
    this.renderView = renderView;
    this.renderText = renderText;
    this.renderActions = renderActions;
    this.finished = false;
  }

  start() {
    this.finished = false;
    this.updateUI();
  }

  getCurrentMapEntry() {
    const px = this.player.getCurrentX(),
      py = this.player.getCurrentY(),
      pa = this.player.getCurrentAngle(),
      ps = this.player.getMapStatus();

    const possibles = this.mapData.filter(
      (it) => it.coordx === px && it.coordy === py && it.direction === pa
    );

    /* on cherche status_action === ps */
    let entry = possibles.find((it) => it.status_action === ps);
    /* fallback */
    if (!entry) {
      entry = possibles.find((it) => it.status_action === 0) || possibles[0];
    }
    return entry;
  }

  updateUI() {
    /* 1) Si finie, n'affiche que Reset */
    if (this.finished) {
      this.renderActions([{ label: "Reset", command: "reset" }]);
      return;
    }

    /* 2) Récupère l'entrée brute */
    const raw = this.getCurrentMapEntry() || {};
    const hasKey = this.player.getMapStatus() === 1;

    /* 3) Si on a la clé et qu'on est devant la porte */
    const atDoor =
      raw.coordx === 0 && raw.coordy === 1 && raw.direction === 180;

    let entry = raw;
    if (hasKey && atDoor) {
      /* cherche dans mapData l'objet porte fermée */
      entry =
        this.mapData.find(
          (it) =>
            it.coordx === 0 &&
            it.coordy === 1 &&
            it.direction === 180 &&
            it.status_action === 0
        ) || raw;
    }

    /* 4) Affiche vue & texte */
    this.renderView(entry.image ?? "01-0.jpg");
    this.renderText(entry.narrative ?? "Voyons voir par ici...");

    /* 5) Construit les boutons */
    const btns = [];

    /* casser vase (id 14) si pas de clé */
    if (entry.id === 14 && !hasKey) {
      btns.push({ label: "Casser", command: "action" });
    }
    /* ouvrir porte (toujours si on est devant la porte) */
    if (atDoor) {
      btns.push({ label: "Ouvrir", command: "action" });
    }
    /* reset */
    btns.push({ label: "Reset", command: "reset" });

    this.renderActions(btns);
  }

  processAction(command) {
    switch (command) {
      case "turnLeft":
        this.player.turnLeft();
        break;
      case "turnRight":
        this.player.turnRight();
        break;
      case "goForward":
        if (this.player.checkForward(this.mapData)) this.player.goForward();
        break;
      case "goBack":
        if (this.player.checkBack(this.mapData)) this.player.goBack();
        break;
      case "goLeft":
        if (this.player.checkLeft(this.mapData)) this.player.goLeft();
        break;
      case "goRight":
        if (this.player.checkRight(this.mapData)) this.player.goRight();
        break;

      case "action": {
        const raw = this.getCurrentMapEntry() || {};
        const hasKey = this.player.getMapStatus() === 1;
        const { coordx: x, coordy: y, direction: a, id } = raw;

        /* 1) Vase sans clé : on casse */
        if (id === 14 && !hasKey) {
          this.player.setMapStatus(1);
          this.renderText(
            "Tu brises le vase et récupères la clé dorée qui se trouvait à l'intérieur !"
          );
        } else if (x === 0 && y === 1 && a === 180 && !hasKey) {
        /* 2) Porte sans clé : message */
          this.renderText("La porte est verrouillée, il te faut la clé !");
        } else if (x === 0 && y === 1 && a === 180 && hasKey) {
        /* 3) Porte avec clé : fin aléatoire */
          this.finished = true;
          const fins = this.mapData.filter(
            (it) =>
              it.coordx === x &&
              it.coordy === y &&
              it.direction === a &&
              it.status_action === 1
          );
          const choix = fins[Math.floor(Math.random() * fins.length)];
          this.renderView(choix.image);
          this.renderText(choix.narrative);
          this.renderActions([{ label: "Reset", command: "reset" }]);
          return;
        } else {
        /* 4) Autre : rien à faire */
          this.renderText("Aucune action particulière ici...");
        }
        break;
      }

      case "reset":
        this.resetGame();
        break;

      default:
        console.log("Commande non reconnue :", command);
    }

    this.updateUI();
  }

  resetGame() {
    this.player.setCurrentX(0);
    this.player.setCurrentY(0);
    this.player.setCurrentAngle(0);
    this.player.setMapStatus(0);
    this.finished = false;
    this.updateUI();
  }
}
/* GameEngine.js */
