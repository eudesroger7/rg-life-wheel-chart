import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  root: "preview",
  plugins: [react()],
  resolve: {
    alias: {
      // Aponta para o código-fonte diretamente, sem precisar buildar antes
      "rg-life-wheel-chart": resolve(__dirname, "src/index.ts"),
    },
  },
  server: {
    port: 3333,
    open: true,
  },
});
