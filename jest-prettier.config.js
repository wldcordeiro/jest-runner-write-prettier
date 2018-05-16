const { resolve } = require('path')
module.exports = {
  rootDir: resolve(__dirname),
  runner: './src/index.js',
  displayName: 'prettier',
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'ts',
    'tsx',
    'css',
    'less',
    'scss',
    'graphql',
    'md',
    'markdown'
  ],
  testMatch: [
    '<rootDir>/**/*.js',
    '<rootDir>/**/*.jsx',
    '<rootDir>/**/*.json',
    '<rootDir>/**/*.ts',
    '<rootDir>/**/*.tsx',
    '<rootDir>/**/*.css',
    '<rootDir>/**/*.less',
    '<rootDir>/**/*.scss',
    '<rootDir>/**/*.graphql',
    '<rootDir>/**/*.md',
    '<rootDir>/**/*.markdown'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/__fixtures__/',
    '<rootDir>/coverage/'
  ]
}
