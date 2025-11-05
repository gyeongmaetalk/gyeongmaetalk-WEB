import { nextJsConfig } from "@gyeongmaetalk/eslint-config/next-js";

import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextJsConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
