import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import { PATHS } from "./constants";
import { buildSentryVitePlugin } from "./plugins";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    build: {
      sourcemap: true,
      emptyOutDir: false,
      outDir: PATHS.dist,
      rollupOptions: {
        input: {
          serviceWorker: resolve(PATHS.src, "service-worker/index.ts"),
        },
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
    },

    plugins: [buildSentryVitePlugin(mode, env)],
  };
});
