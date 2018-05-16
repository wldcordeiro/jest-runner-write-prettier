const fs = require('fs')
const { bindNodeCallback } = require('rxjs')
const { map, mapTo } = require('rxjs/operators')

const readFile = bindNodeCallback(fs.readFile)
const writeFile = bindNodeCallback(fs.writeFile)

function readContent(path) {
  return readFile(path, 'utf8').pipe(map(content => ({ path, content })))
}

function writeContent(path, content) {
  return writeFile(path, content, 'utf8').pipe(mapTo({ path, content }))
}

module.exports = {
  readContent,
  writeContent
}
