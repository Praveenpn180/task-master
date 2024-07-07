import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import {VitePWA} from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "Task Master",
        name: "Todo List Application",
        theme_color: "#8936FF",
        background_color: "#2EC6FE",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_rounded.png",
            type: "image/png",
          },
        ],
        orientation: "any",
        display: "standalone",
        dir: "auto",
        lang: "en-US",
        start_url: "https://taskmaster.praveenpn.in",
      },
      registerType: "autoUpdate", // This will automatically update the service worker
      workbox: {
        globPatterns: ["**/*.{js,css,html,png}"],
      },
    }),
  ],
  server: {
    https: true,
  },
})
