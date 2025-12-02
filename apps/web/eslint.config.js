import js from "@eslint/js";
import { config as baseConfig } from "@gyeongmaetalk/eslint-config/base";

import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default defineConfig([
  pluginReact.configs.flat.recommended,
  ...baseConfig,
  {
    ignores: [
      ".github",
      ".husky",
      "node_modules",
      ".react-router",
      "**/*.cjs",
      "./app/components/icons",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-undef": "off",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          args: "none",
        },
      ],
    },
  },
  {
    files: ["**/*.d.ts", "**/constants/**/*.ts"],
    rules: {
      "no-unused-vars": "off",
    },
  },
]);
