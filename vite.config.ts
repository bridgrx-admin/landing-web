import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
    // Allow your ngrok host
    allowedHosts: [
      "63f6c4a52295.ngrok-free.app",
      "24e9-2605-59c1-18c0-4f08-4daa-e2cb-c81f-cfbe.ngrok-free.app",
    ],
  },
});
