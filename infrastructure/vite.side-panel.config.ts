import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";
/** @type {import('../package.json')} */
import packageJson from "../package.json";
import { PATHS } from "./constants";
import { buildSentryVitePlugin } from "./plugins";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const appName = String(packageJson.name);

  const appVersion = String(packageJson.version);

  return {
    publicDir: resolve(PATHS.root, "public"),

    define: {
      "process.env": {
        APP_NAME: appName,
        APP_VERSION: appVersion,
      },
    },

    build: {
      sourcemap: true,
      emptyOutDir: false,
      outDir: PATHS.dist,
      modulePreload: false,
      rollupOptions: {
        input: {
          sidePanel: resolve("index.html"),
        },
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
        // cannot upload @mui/material sourcemaps. See https://github.com/vitejs/vite/issues/15012
        onwarn(warning, defaultHandler) {
          if (warning.code === "SOURCEMAP_ERROR") {
            return;
          }

          defaultHandler(warning);
        },
      },
    },

    plugins: [
      react(),
      copy({
        targets: [
          {
            src: resolve(
              PATHS.src,
              mode !== "development" ? "manifest.json" : "manifest.dev.json"
            ),
            dest: PATHS.dist,
            rename: "manifest.json",
            transform(content) {
              return content
                .toString()
                .replace(/\$APP_NAME/g, appName)
                .replace(/\$APP_VERSION/g, appVersion)
                .replace(/\$APP_DESCRIPTION/g, packageJson.description)
                .replace(
                  /\$GOOGLE_OAUTH_CLIENT_ID/g,
                  String(env.GOOGLE_OAUTH_CLIENT_ID)
                );
            },
          },
          /**
           * Our plugin is blocked due to sentry lazy-load mechanism, which includes links to cdn.
           * Therefore we need to remove the CDN URL from the sourcemap at least until sentry fixes the issue.
           * {@link}[https://github.com/getsentry/sentry-javascript/issues/14010]
           */
          // {
          //   src: resolve(PATHS.dist, 'sidePanel.js'),
          //   dest: PATHS.dist,
          //   transform(content) {
          //     return content
          //       .toString()
          //       .replace(/https:\/\/browser\.sentry-cdn\.com/g, '');
          //   },
          // },
          /**
           * Our plugin is blocked due to sentry lazy-load mechanism, which includes links to cdn.
           * Therefore we need to remove the CDN URL from the sourcemap at least until sentry fixes the issue.
           * {@link}[https://github.com/getsentry/sentry-javascript/issues/14010]
           */
          // {
          //   src: resolve(PATHS.dist, 'sidePanel.js.map'),
          //   dest: PATHS.dist,
          //   transform(content) {
          //     return content
          //       .toString()
          //       .replace(/https:\/\/browser\.sentry-cdn\.com/g, '');
          //   },
          // },
        ],
        hook: "writeBundle",
      }),
      buildSentryVitePlugin(mode, env),
    ],
  };
});
