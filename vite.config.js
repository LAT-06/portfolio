import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [vue()],
    base: command === "serve" ? "/" : "/portfolio/", // <-- ĐÃ SỬA
    build: {
      outDir: "dist",
      assetsDir: "assets",
    },
  };
  return config;
});
