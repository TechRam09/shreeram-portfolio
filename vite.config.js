import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "motion": ["framer-motion"],
          "gsap": ["gsap", "@gsap/react"],
          "graphics": ["vgpu"],
          "icons": ["lucide-react", "@hugeicons/react", "@hugeicons/core-free-icons"],
        },
      },
    },
  },
});
