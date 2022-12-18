/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

/**
 * ESLint configuration.
 *
 * @see https://eslint.org/docs/user-guide/configuring
 * @type {import("eslint").Linter.Config}
 */

const restrictedGlobals = require("confusing-browser-globals");

const OFF = 0;
const ERROR = 2;

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
    "accessor-pairs": OFF,
    "brace-style": [ERROR, "1tbs"],
    "consistent-return": OFF,
    "dot-location": [ERROR, "property"],
    // We use console['error']() as a signal to not transform it:
    "dot-notation": [ERROR, { allowPattern: "^(error|warn)$" }],
    "eol-last": ERROR,
    eqeqeq: [ERROR, "allow-null"],
    indent: OFF,
    "jsx-quotes": [ERROR, "prefer-double"],
    "keyword-spacing": [ERROR, { after: true, before: true }],
    "no-bitwise": OFF,
    "no-console": OFF,
    "no-inner-declarations": [ERROR, "functions"],
    "no-multi-spaces": ERROR,
    "no-restricted-globals": [ERROR].concat(restrictedGlobals),
    "no-restricted-syntax": [ERROR, "WithStatement"],
    "no-shadow": ERROR,
    "no-unused-expressions": ERROR,
    "no-unused-vars": [ERROR, { args: "none" }],
    "no-use-before-define": OFF,
    "no-useless-concat": OFF,
    quotes: [
      ERROR,
      "single",
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    "space-before-blocks": ERROR,
    "space-before-function-paren": OFF,
    "valid-typeof": [ERROR, { requireStringLiterals: true }],
    // Flow fails with non-string literal keys
    "no-useless-computed-key": OFF,

    // We apply these settings to files that should run on Node.
    // They can't use JSX or ES6 modules, and must be in strict mode.
    // They can, however, use other ES6 features.
    // (Note these rules are overridden later for source files.)
    "no-var": ERROR,
    strict: ERROR,

    // Enforced by Prettier
    // TODO: Prettier doesn't handle long strings or long comments. Not a big
    // deal. But I turned it off because loading the plugin causes some obscure
    // syntax error and it didn't seem worth investigating.
    "max-len": OFF,
    // Prettier forces semicolons in a few places
    "flowtype/object-type-delimiter": OFF,

    // React & JSX
    // Our transforms set this automatically
    "react/jsx-boolean-value": [ERROR, "always"],
    "react/jsx-no-undef": ERROR,
    // We don't care to do this
    "react/jsx-sort-prop-types": OFF,
    "react/jsx-space-before-closing": ERROR,
    "react/jsx-uses-react": ERROR,
    "react/no-is-mounted": OFF,
    // This isn't useful in our test code
    "react/react-in-jsx-scope": ERROR,
    "react/self-closing-comp": ERROR,
    // We don't care to do this
    "react/jsx-wrap-multilines": [
      ERROR,
      { declaration: false, assignment: false },
    ],

    // Prevent for...of loops because they require a Symbol polyfill.
    // You can disable this rule for code that isn't shipped (e.g. build scripts and tests).
    "no-for-of-loops/no-for-of-loops": ERROR,

    // Prevent function declarations after return statements
    "no-function-declare-after-return/no-function-declare-after-return": ERROR,

    // CUSTOM RULES
    // the second argument of warning/invariant should be a literal string
    "react-internal/no-primitive-constructors": ERROR,
    "react-internal/safe-string-coercion": [
      ERROR,
      { isProductionUserAppCode: true },
    ],
    "react-internal/no-to-warn-dev-within-to-throw": ERROR,
    "react-internal/warning-args": ERROR,
    "react-internal/no-production-logging": ERROR,
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
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/core-modules": ["__STATIC_CONTENT_MANIFEST"],
    react: {
      version: "detect",
    },
  },
};
