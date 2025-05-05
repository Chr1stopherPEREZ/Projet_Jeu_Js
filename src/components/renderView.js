/**
 * Met à jour la section "view" de l'interface de jeu avec l'image correspondante à la vue actuelle.
 *
 * @param {string} imageName - Le nom du fichier image à afficher
 */

export function renderView(imageName) {
  const viewElement = document.getElementById("view");
  if (!viewElement) return;

  const basePath = "/src/assets/images/";

  const imageSrc = imageName
    ? `${basePath}${imageName}`
    : `${basePath}default.png`;

  console.log("Chemin final de l'image :", imageSrc); /* Pour debug */

  viewElement.innerHTML = `<img src="${imageSrc}" alt="Vue du joueur" />`;
}

/* RenderView.js */
