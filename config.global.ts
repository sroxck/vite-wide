// config.ts
import path from "path";

export const sharedConfig = {
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
};
