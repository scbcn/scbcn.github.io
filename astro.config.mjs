import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://softwarecrafters.barcelona",
  outDir: "./dist",
  publicDir: "./public",
  build: {
    format: "file",
  },
  vite: {
    build: {
      rollupOptions: {
        external: [/^assets\//],
        output: {
          assetFileNames: "assets/[name].[ext]",
        },
      },
    },
  },
});
