const { resolve } = require('path')
const rootDir = resolve(__dirname)
module.exports = {
  rootDir,
  displayName: 'test',
  testPathIgnorePatterns: ['/node_modules/', '/helpers/', '/fixtures/'],
  collectCoverageFrom: ['src/**/*.js']
}
