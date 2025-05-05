// src/api/dataLoader.js

/**
 * dataLoader.js
 *
 * Ce module charge les données du jeu depuis un fichier JSON,
 * remplaçant ainsi les requêtes SQL qui étaient effectuées dans l'ancien projet PHP via fpview.sql.
 * Le fichier JSON (par exemple, src/data/map.json) doit contenir un tableau d'objets avec les informations
 * nécessaires : coordonnées, direction, images, textes narratifs et actions.
 */

export async function loadMapData() {
  try {
    // On suppose que le fichier map.json se trouve dans src/data/
    const response = await fetch("./src/data/map.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const mapData = await response.json();
    return mapData;
  } catch (error) {
    console.error("Erreur lors du chargement des données de la carte :", error);
    // En cas d'erreur, renvoyer un tableau vide
    return [];
  }
}

/* DataLoader.js */
