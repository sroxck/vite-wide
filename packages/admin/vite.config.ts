import { defineConfig } from "vite";
import path from "path";
import { sharedConfig } from "../../config.global.ts";
const { commonPlugins, ...commonConfig } = sharedConfig;
export default defineConfig({
  plugins: [...commonPlugins],
  root: path.resolve(__dirname),
  ...commonConfig,
});
