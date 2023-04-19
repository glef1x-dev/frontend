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
    "plugin:import/typescript",
  ],

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/resolver": {
          "typescript": {
            "extensions": [".js", ".jsx", ".ts", ".tsx"],
            "alias": {
              map: [
                ["~", "./app"],
              ],
            },
          },
        },
      },
      env: {
        node: true,
        browser: true,
        es2021: true
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@next/next/recommended",
      ],
      rules: {
        "@typescript-eslint/array-type": [
          "warn",
          {
            "default": "generic",
          },
        ],
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-empty-interface": [
          "warn",
          {
            "allowSingleExtends": true,
          },
        ],

      },
      plugins: ["@typescript-eslint"],
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    {
      files: [".eslintrc.cjs", "*/vite.config.ts", "scripts/**/*.js"],
      env: { node: true },
    },
    {
      files: ["*.cjs"],
      parserOptions: { sourceType: "script" },
    },
  ],

  ignorePatterns: ["/.cache", "/.git", "/.husky", "/.yarn", "/*/dist"],

  settings: {
    "import/resolver": {
      typescript: {
        project: ["app/tsconfig.json"],
      },
    },
    "import/core-modules": ["__STATIC_CONTENT_MANIFEST"],
    react: {
      version: "detect",
    },
  },
};
