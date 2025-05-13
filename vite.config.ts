// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",

  build: {
    /* dossier généré par `vite build` */
    outDir: "dist",
    emptyOutDir: true,
  },
});

/* Passage a Pnpm, Merci Mathis */
