/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

/**
 * ESLint configuration.
 *
 * @see https://eslint.org/docs/user-guide/configuring
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,

  env: {
    es6: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },

  rules: {
    // turn on errors for missing imports
    "import/no-unresolved": "error",
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
      ],
      rules: {
        "react/no-children-prop": "off",
        "react/react-in-jsx-scope": "off",
      },
      plugins: ["@typescript-eslint"],
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    {
      files: ["*.test.js"],
      env: { jest: true },
    },
    {
      files: [
        ".eslintrc.cjs",
        "app/vite.config.ts",
        "babel.config.cjs",
        "rollup.config.mjs",
        "scripts/**/*.js",
      ],
      env: { node: true },
    },
    {
      files: ["*.cjs"],
      parserOptions: { sourceType: "script" },
    },
  ],

  ignorePatterns: [
    "/.cache",
    "/.git",
    "/.husky",
    "/.yarn",
    "/*/dist",
    "/app/queries",
  ],

  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["app/tsconfig.json", "edge/tsconfig.json"],
      },
    },
    "import/core-modules": ["__STATIC_CONTENT_MANIFEST"],
    react: {
      version: "detect",
    },
  },
};
