import path from "path";
import { plugins } from "./plugins";
export const sharedConfig = {
  commonPlugins: [...plugins],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "./packages/shared"),
    },
  },
};
