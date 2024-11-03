import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { type PluginOption } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
export const plugins: PluginOption[] = [
  vue(),
  vueJsx(),
  AutoImport({
    imports: ["vue", "vue-router"],
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
];
