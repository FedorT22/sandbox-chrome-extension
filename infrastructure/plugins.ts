import { sentryVitePlugin } from "@sentry/vite-plugin";
import type { PluginOption } from "vite";
/** @type {import('../package.json')} */
import packageJson from "../package.json";

export const buildSentryVitePlugin = (
  mode: string,
  env: Record<string, string>
): PluginOption => {
  if (mode === "development") return {} as PluginOption;

  const appVersion = String(packageJson.version);

  return sentryVitePlugin({
    org: env.SENTRY_ORG,
    project: env.SENTRY_PROJECT,
    authToken: env.SENTRY_SOURCE_MAPS_AUTH_TOKEN,
    debug: true,
    telemetry: false,
    release: {
      name: `${appVersion}-${mode}`,
      deploy: {
        env: mode,
      },
    },
  }) as PluginOption;
};
