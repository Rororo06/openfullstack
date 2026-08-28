const babelParser = require('@babel/eslint-parser');
const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');

module.exports = [
  {
    ignores: ['node_modules/**', '.expo/**', 'dist/**', 'web-build/**'],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { presets: ['babel-preset-expo'] },
        ecmaFeatures: { jsx: true },
      },
      globals: {
        console: 'readonly',
        module: 'writable',
        require: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-native': reactNative },
    rules: {
      ...react.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-native/no-unused-styles': 'error',
      'no-unused-vars': 'error',
    },
  },
];
