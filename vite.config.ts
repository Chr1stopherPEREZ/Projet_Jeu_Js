// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    /* dossier généré par `vite build` */
    outDir: "dist",
    emptyOutDir: true,
  },
});

/* Passage à Pnpm, Merci Mathis */
