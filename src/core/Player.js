export class Player {
  /**
   * Constructeur de la classe Player
   * @param {Object} initialState - État initial du joueur.
   * Exemple : { x: 0, y: 1, angle: 0, mapStatus: 0 }
   */
  constructor(initialState) {
    /* Coordonnées sur la map */
    this.currentX = initialState.x || 0;
    this.currentY = initialState.y || 1;
    /* Angle de vue en degrés (0, 90, 180, 270) */
    this.currentAngle = initialState.angle || 0;
    /* Statut de la map (peut représenter si une action a déjà été exécutée, etc.) */
    this.mapStatus = initialState.mapStatus || 0;
    /* Identifiant de la map associé à la position et à l'orientation */
    this.mapId = null;
    /* Orientation de la boussole */
    this.currentCompass = "";
  }

  /* Setters et Getters */

  setCurrentX(x) {
    this.currentX = x;
  }

  getCurrentX() {
    return this.currentX;
  }

  setCurrentY(y) {
    this.currentY = y;
  }

  getCurrentY() {
    return this.currentY;
  }

  setCurrentAngle(angle) {
    this.currentAngle = angle;
    return angle;
  }

  getCurrentAngle() {
    return this.currentAngle;
  }

  /**
   * Méthode privée simulant la vérification d'un déplacement.
   * @param {number} newX - Nouvelle coordonnée X.
   * @param {number} newY - Nouvelle coordonnée Y.
   * @param {number} currentAngle - Angle courant.
   * @param {Array} mapData - Tableau d'objets représentant la configuration de la map.
   * Chaque objet devra contenir au moins : { id, coordx, coordy, direction }
   * @returns {boolean} - TRUE si le déplacement est autorisé, sinon FALSE.
   */
  _checkMove(newX, newY, currentAngle, mapData) {
    const result = mapData.find(
      (item) =>
        item.coordx === newX &&
        item.coordy === newY &&
        item.direction === currentAngle
    );
    return result !== undefined;
  }

  /* Vérification des déplacements */

  checkForward(mapData) {
    let newX = this.currentX;
    let newY = this.currentY;
    switch (this.currentAngle) {
      case 0:
        newX++;
        break;
      case 90:
        newY++;
        break;
      case 180:
        newX--;
        break;
      case 270:
        newY--;
        break;
      default:
        break;
    }
    return this._checkMove(newX, newY, this.currentAngle, mapData);
  }

  checkBack(mapData) {
    let newX = this.currentX;
    let newY = this.currentY;
    switch (this.currentAngle) {
      case 0:
        newX--;
        break;
      case 90:
        newY--;
        break;
      case 180:
        newX++;
        break;
      case 270:
        newY++;
        break;
      default:
        break;
    }
    return this._checkMove(newX, newY, this.currentAngle, mapData);
  }

  checkRight(mapData) {
    let newX = this.currentX;
    let newY = this.currentY;
    switch (this.currentAngle) {
      case 0:
        newY--;
        break;
      case 90:
        newX++;
        break;
      case 180:
        newY++;
        break;
      case 270:
        newX--;
        break;
      default:
        break;
    }
    return this._checkMove(newX, newY, this.currentAngle, mapData);
  }

  checkLeft(mapData) {
    let newX = this.currentX;
    let newY = this.currentY;
    switch (this.currentAngle) {
      case 0:
        newY++;
        break;
      case 90:
        newX--;
        break;
      case 180:
        newY--;
        break;
      case 270:
        newX++;
        break;
      default:
        break;
    }
    return this._checkMove(newX, newY, this.currentAngle, mapData);
  }

  /* Méthodes de déplacement effectif */

  goForward() {
    switch (this.currentAngle) {
      case 0:
        this.currentX++;
        break;
      case 90:
        this.currentY++;
        break;
      case 180:
        this.currentX--;
        break;
      case 270:
        this.currentY--;
        break;
      default:
        break;
    }
  }

  goBack() {
    switch (this.currentAngle) {
      case 0:
        this.currentX--;
        break;
      case 90:
        this.currentY--;
        break;
      case 180:
        this.currentX++;
        break;
      case 270:
        this.currentY++;
        break;
      default:
        break;
    }
  }

  goRight() {
    switch (this.currentAngle) {
      case 0:
        this.currentY--;
        break;
      case 90:
        this.currentX++;
        break;
      case 180:
        this.currentY++;
        break;
      case 270:
        this.currentX--;
        break;
      default:
        break;
    }
  }

  goLeft() {
    switch (this.currentAngle) {
      case 0:
        this.currentY++;
        break;
      case 90:
        this.currentX--;
        break;
      case 180:
        this.currentY--;
        break;
      case 270:
        this.currentX++;
        break;
      default:
        break;
    }
  }

  /* Méthodes de rotation */

  turnRight() {
    switch (this.currentAngle) {
      case 0:
        this.currentAngle = 270;
        break;
      case 90:
        this.currentAngle = 0;
        break;
      case 180:
        this.currentAngle = 90;
        break;
      case 270:
        this.currentAngle = 180;
        break;
      default:
        break;
    }
  }

  turnLeft() {
    switch (this.currentAngle) {
      case 0:
        this.currentAngle = 90;
        break;
      case 90:
        this.currentAngle = 180;
        break;
      case 180:
        this.currentAngle = 270;
        break;
      case 270:
        this.currentAngle = 0;
        break;
      default:
        break;
    }
  }

  /**
   * Renvoie l'identifiant de la map correspondant aux coordonnées actuelles et à l'angle.
   * @param {Array} mapData - Tableau d'objets de configuration de la map.
   * @returns {number|null} - L'identifiant de la map ou null si non trouvé.
   */
  getMapId(mapData) {
    const currentX = this.currentX;
    const currentY = this.currentY;
    const currentAngle = this.currentAngle;
    const entry = mapData.find(
      (item) =>
        item.coordx === currentX &&
        item.coordy === currentY &&
        item.direction === currentAngle
    );
    if (entry) {
      this.mapId = entry.id;
    }
    return this.mapId;
  }

  /**
   * Met à jour le statut de la map.
   * @param {number} status - Nouveau statut.
   * @returns {number} - Le nouveau statut.
   */
  setMapStatus(status) {
    this.mapStatus = status;
    return status;
  }

  /**
   * Récupère le statut de la map en fonction des actions associées.
   * @param {Array} actionData - Tableau d'objets définissant les actions, contenant au moins { map_id, status }.
   * @param {Array} mapData - Tableau d'objets de configuration de la map.
   * @returns {number} - Le statut de la map (0 par défaut si aucune action correspondante n'est trouvée).
   */
  getMapStatus() {
    return this.mapStatus;
  }
}

/* Player.js */
