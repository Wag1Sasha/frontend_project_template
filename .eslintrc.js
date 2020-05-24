module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    "prettier",
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    "prettier"
  ],
  rules: {
    "indent": ["error", 2],
    "react/jsx-indent": [0],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "react/jsx-filename-extension": [0],
    "import/prefer-default-export": [0],
    "import/no-unresolved": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/no-noninteractive-element-interactions": [0],
    "@typescript-eslint/interface-name-prefix": [0],
    "prettier/prettier": ["error"],
    "no-underscore-dangle": [0],
    "jsx-a11y/control-has-associated-label": [0],
    "@typescript-eslint/no-unused-vars": [0],
    "@typescript-eslint/no-empty-function": [0]
  },
};