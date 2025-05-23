/**
 * Met à jour la section "view" de l'interface de jeu avec l'image correspondante à la vue actuelle.
 *
 * @param {string} imageName - Le nom du fichier image à afficher
 */

export function renderView(imageName) {
  const viewElement = document.getElementById("view");
  if (!viewElement) return;

  /* Utilisation d'un chemin relatif compatible Vite (dev + prod) */
  const imageSrc = imageName
    ? new URL(`../assets/images/${imageName}`, import.meta.url).href
    : new URL(`../assets/images/default.png`, import.meta.url).href;

  console.log("Chemin final de l'image :", imageSrc); /* Pour debug */

  viewElement.innerHTML = `<img src="${imageSrc}" alt="Vue du joueur" />`;
}

/* RenderView.js */
