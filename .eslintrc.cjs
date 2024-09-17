module.exports = {
  parser: "@babel/eslint-parser",
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],

  globals: {
    __dirname: true,
    process: true,
    require: true,
    module: true
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest', sourceType: 'module',
    babelOptions: {
      presets: ['@babel/preset-react']
    },
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', "@stylexjs"],
  rules: {
    "@stylexjs/valid-styles": "error",
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ]
  },
}
