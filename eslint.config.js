module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        chrome: 'readonly',
        browser: 'readonly',
        document: 'readonly',
        window: 'readonly',
        Image: 'readonly',
        module: 'readonly',
      },
    },
    rules: {
      'no-constant-condition': 'error',
      'no-unreachable': 'error',
      'no-undef': 'warn',
      'no-unused-vars': ['warn', { args: 'none' }],
    },
  },
];
