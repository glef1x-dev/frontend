import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

function getEnvVariableOrThrow(variableName: string): string {
  const value = process.env[variableName];
  if (!value) {
    throw new Error(`Environment variable ${variableName} was not provided.`);
  }
  return value;
}

function getEnvVariableOrDefault(
  variableName: string,
  defaultValue: string,
): string {
  const value = process.env[variableName];
  if (!value) {
    return defaultValue;
  }
  return value;
}

const config = {
  app: {
    env: getEnvVariableOrDefault("NODE_ENV", "development"),
    name: process.env.APP_NAME,
    baseAPIUrl: getEnvVariableOrThrow("BASE_API_URL"),
  },
  utternances: {
    repositoryName: getEnvVariableOrThrow("UTTERNANCES_REPOSITORY_NAME"),
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  donation: {
    monobank: {
      jarUrl: getEnvVariableOrThrow("MONOBANK_JAR_URL"),
    },
  },
};

// Pass client-side configuration to the web app
// https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
process.env.VITE_CONFIG = JSON.stringify(config);

/**
 * Vite configuration
 * https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  const generatedScopedName =
    mode === "production" ? "[hash:base64:2]" : "[local]_[hash:base64:2]";
  return {
    cacheDir: `../.cache/vite-app`,
    build: {
      outDir: "./dist",
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom", "recoil"],
          },
        },
      },
    },

    define: {
      __DEV__: process.env.NODE_ENV === "development",
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL(".", import.meta.url)),
      },
    },

    plugins: [
      // https://github.com/vitejs/vite/tree/main/packages/plugin-react
      react({
        jsxRuntime: "classic",
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
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
