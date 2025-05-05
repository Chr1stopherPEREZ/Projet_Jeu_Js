/**
 * Met à jour la zone des actions disponibles pour le joueur en générant dynamiquement des boutons.
 *
 * Chaque action dans le tableau actions doit être un objet avec au moins deux propriétés :
 *   - label: le texte ou l'icône à afficher sur le bouton
 *   - command: la commande associée à cette action
 *
 * @param {Array} actions - Tableau des objets actions à afficher.
 * @param {Function} onAction - Fonction callback à exécuter lorsqu'un bouton est cliqué.
 *                              Cette fonction reçoit en paramètre la commande associée à l'action.
 */

export function renderActions(actions, onAction) {
  const actionsElement = document.getElementById("actions");
  if (!actionsElement) {
    console.error(
      "L'élément avec l'id 'actions' n'a pas été trouvé dans le DOM."
    );
    return;
  }

  // On vide le conteneur des actions pour le remplir avec de nouvelles options.
  actionsElement.innerHTML = "";

  actions.forEach((action) => {
    const button = document.createElement("button");
    button.textContent = action.label; // Affiche le label de l'action sur le bouton

    button.classList.add("action-button");

    /* Lorsqu'on clique sur le bouton, on exécute la fonction de callback en lui passant la commande */
    button.addEventListener("click", () => {
      if (typeof onAction === "function") {
        onAction(action.command);
      }
    });

    actionsElement.appendChild(button);
  });
}

/* RenderAction.js */
