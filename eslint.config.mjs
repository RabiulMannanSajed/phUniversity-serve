import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      "no-unused-vars": "error",
      "prefer-const": "error",
      "no-unused-expressions": "error",
      "no-console": "warning",
    },
  },
  {
    ignores: ["node_modules/**"],
  },
  {
    globals: {
      process: "readonly",
    },
  },
];
