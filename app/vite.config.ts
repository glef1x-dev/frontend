/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import react from "@vitejs/plugin-react";
import envars from "envars";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// Load environment variables for the target environment
envars.config();

// The list of environment variables required by the app
const defineVars = [
  "APP_ENV",
  "APP_NAME",
  "APP_HOSTNAME",
  "GITHUB_PERSONAL_TOKEN",
  "BASE_API_URL",
];

/**
 * Vite configuration
 * https://vitejs.dev/config/
 */
export default defineConfig({
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: [
            "react",
            "react-dom",
            "react-router-dom",
            "recoil",
            "react-markdown",
          ],
        },

      },
    },
  },

  define: Object.fromEntries(
    defineVars.map((key) => [key, JSON.stringify(process.env[key])])
  ),

  plugins: [
    // https://github.com/vitejs/vite/tree/main/packages/plugin-react
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
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
});
