
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto", semi: true, singleQuote: false}],
  }
};