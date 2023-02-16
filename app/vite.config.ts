import react from "@vitejs/plugin-react";
import envars from "envars";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import {sentryVitePlugin} from "@sentry/vite-plugin";

// Load environment variables for the target environment
envars.config();

// The list of environment variables required by the app
const defineVars = [
  "APP_ENV",
  "APP_NAME",
  "APP_HOSTNAME",
  "BASE_API_URL",
  "UTTERNANCES_REPOSITORY_NAME",
  "SENTRY_DSN"
];

/**
 * Vite configuration
 * https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  const generatedScopedName =
    mode === "production" ? "[hash:base64:2]" : "[local]_[hash:base64:2]";
  return {
    build: {
      outDir: "./dist",
      emptyOutDir: true,
      sourcemap: true
    },


    define: {
      ...Object.fromEntries(
        defineVars.map((key) => [key, JSON.stringify(process.env[key])])
      ),
      __DEV__: process.env.NODE_ENV === "development",
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL(".", import.meta.url)),
      },
    },

    plugins: [
      // https://github.com/vitejs/vite/tree/main/packages/plugin-react
      react(),
      nodePolyfills({
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
      sentryVitePlugin({
        // TODO: probably organization name and project name should be environment variables
        org: "educate-dz",
        project: "glefix-frontend",
        include: "./dist",
        authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
      }),
    ],

    server: {
      proxy: {
        "/api": {
          target: process.env.BASE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    css: {
      modules: {
        localsConvention: "camelCase",
        generatedScopedName,
      },
    },
  };
});
