// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
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
    quotes: ['error','single',{allowTemplateLiterals: true}],
    semi: ["error", "always"],
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-unused-vars": 'warn'
  }
}
);