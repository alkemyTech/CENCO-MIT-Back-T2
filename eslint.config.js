import stylisticJs from '@stylistic/eslint-plugin';
import babelParser from '@babel/eslint-parser';

export default [
  {
    files: ['*.js', '**/*.js'],
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      'no-unused-vars': 'error',
      'no-var': 'error',
      'comma-spacing': ['error', { before: false, after: true }],
      semi: ['error', 'always', { omitLastInOneLineBlock: true }],
      quotes: ['error', 'single'],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-json-modules'],
        },
      },
    },
  },
];
