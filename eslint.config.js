const parser = require('@typescript-eslint/parser')

module.exports = {
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      env: 'writable',
      jest: 'writable',
    },
    parser: parser,
    parserOptions: {
      // project: 'tsconfig.json',
      requireConfigFile: false,
      tsconfigRootDir: __dirname,
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
    },
  },

  ignores: ['eslint.config.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
