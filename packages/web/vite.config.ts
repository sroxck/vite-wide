import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { sharedConfig } from "../../config.global.ts";
export default defineConfig({
  plugins: [vue()],
  root: path.resolve(__dirname),
  ...sharedConfig,
});
