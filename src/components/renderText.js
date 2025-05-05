/**
 * Met à jour la zone narrative du jeu avec le texte fourni.
 * @param {string} narrativeText - Le texte narratif à afficher.
 */

export function renderText(narrativeText) {
  const textElement = document.getElementById("text");
  if (!textElement) {
    console.error("L'élément avec l'id 'text' n'a pas été trouvé dans le DOM.");
    return;
  }

  /* Si aucun texte n'est fourni, on affiche un message par défaut */
  textElement.textContent =
    narrativeText || "Ca sent la mort... mais pas que !";
}

/* RenderText.js */
