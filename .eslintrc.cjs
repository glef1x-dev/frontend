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
    ecmaVersion: 2020,
    sourceType: "module",
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      excludedFiles: ["vite.config.ts"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/resolver": {
          "typescript": {
            "extensions": [".js", ".jsx", ".ts", ".tsx"],
            "alias": {
              map: [
                ["@", "./app"]
              ]
            }
          },
        }
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "airbnb",
        "airbnb/hooks",
        "plugin:react/recommended",
      ],
      env: {
        browser: true,
      },
      rules: {
        "no-unused-vars": "off",
        "no-undef": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "react/no-children-prop": "off",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "import/prefer-default-export": "off",
        "arrow-body-style": "off",
        "react/require-default-props": "off",
        "no-useless-return": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-use-before-define": "error",
        "no-shadow": "off",
        "react/jsx-props-no-spreading": "off",
        "react/no-danger": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "camelcase": "off",
        "func-names": "off",
        "no-param-reassign": "off",
        "no-empty": "warn",
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-shadow": "error",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
        "import/extensions": ["error", "ignorePackages", {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        }],
        "no-restricted-imports": [
          "error",
          {
            "patterns": ["@mui/*/*/*"],
          },
        ],
        "import/no-absolute-path": "off"
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
        project: ["app/tsconfig.json", "edge/tsconfig.json"],
      },
    },
    "import/core-modules": ["__STATIC_CONTENT_MANIFEST"],
    react: {
      version: "detect",
    },
  },
};
