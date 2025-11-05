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
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
]);
