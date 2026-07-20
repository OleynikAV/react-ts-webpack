const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const reactPlugin = require('eslint-plugin-react');
const globals = require('globals');

module.exports = tseslint.config(
   {
      ignores: ['build/**', 'coverage/**', 'node_modules/**'],
   },
   js.configs.recommended,
   ...tseslint.configs.recommended,
   reactPlugin.configs.flat.recommended,
   {
      files: ['**/*.{js,jsx,ts,tsx}'],
      languageOptions: {
         ecmaVersion: 2022,
         sourceType: 'module',
         globals: {
            ...globals.browser,
            ...globals.node,
         },
         parserOptions: {
            ecmaFeatures: { jsx: true },
         },
      },
      settings: {
         react: { version: 'detect' },
      },
      rules: {
         '@typescript-eslint/no-var-requires': 'off',
         'semi': ['error', 'always'],
         'quotes': ['error', 'single'],
         'indent': ['error', 3, { SwitchCase: 2, ignoredNodes: ['TemplateLiteral'] }],
         'no-fallthrough': 'off',
         'no-multiple-empty-lines': [1, { max: 2 }],
         'no-nested-ternary': 1,
         'eqeqeq': 2,
         'react/prop-types': 'off',
         'no-console': ['error', { allow: ['warn', 'error'] }],
         'key-spacing': 2,
         'no-unused-vars': 'off',
         '@typescript-eslint/no-unused-vars': ['warn'],
         'comma-dangle': ['error', 'always-multiline'],
         'space-in-parens': ['error', 'never'],
         'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
         }],
         'space-before-blocks': 'error',
         'space-infix-ops': 'error',
         'semi-spacing': 'error',
         'brace-style': 'error',
         'object-curly-spacing': ['error', 'always'],
         'array-bracket-spacing': ['error', 'never'],
      },
   },
);
