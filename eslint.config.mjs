// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  {
    languageOptions:{
      parserOptions:{
        project: true,
        tsconfigRootDir: import.meta.dirname,
      }
    },
    files: ["src/**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      semi: ["error", "always"],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-floating-promises":"off",
      "require-await": "off",
      "no-unsafe-argument": "off"
    }
  }
);