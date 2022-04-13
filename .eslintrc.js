module.exports = {
  env: {
    node: true,
    // browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: { "jsx": true },
  },
  plugins: ["react", "import", "jsx-a11y"],
  rules: {
    sourceType: 'module',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-unused-vars': [2, { 'args': 'none' }],
    // 'space-before-function-paren': [true, 'never'],
  },
  settings: {
    "react": {
      "version": "detect"
    }
  }
}