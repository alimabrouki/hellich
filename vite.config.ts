import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  server: command === 'serve' ? {
    proxy: {
      "/api": "http://localhost:8787",
    },
  } : undefined,
}))
