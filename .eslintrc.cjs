module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.app.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    // React
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-key': 'error',

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
    }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',

    // Best practices
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn',
    'eqeqeq': ['error', 'smart'],
    'no-eval': 'error',
    'no-param-reassign': 'error',
  },
  settings: {
    react: { version: 'detect' },
  },
  ignorePatterns: ['dist/', 'node_modules/'],
}