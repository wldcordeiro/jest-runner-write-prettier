const { resolve } = require('path')
module.exports = {
  rootDir: resolve(__dirname),
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/src/**/*.js', '*.js']
}
