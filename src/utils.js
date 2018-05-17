const fs = require('fs')
const { bindNodeCallback, of } = require('rxjs')
const { map, mapTo, mergeMap } = require('rxjs/operators')
const prettier = require('prettier')

const readFile = bindNodeCallback(fs.readFile)
const writeFile = bindNodeCallback(fs.writeFile)

function readContent(path) {
  return readFile(path, 'utf8').pipe(map(content => ({ path, content })))
}

function writeContent(path, content) {
  return writeFile(path, content, 'utf8').pipe(mapTo({ path, content }))
}

function writePrettified(path, config) {
  return readContent(path).pipe(
    mergeMap(({ content }) => {
      const prettierConfig = Object.assign({}, config, { filepath: path })
      const isPretty = prettier.check(content, prettierConfig)
      if (isPretty) {
        return of({ path, content })
      }
      const prettified = prettier.format(content, prettierConfig)
      return writeContent(path, prettified)
    })
  )
}

module.exports = {
  readContent,
  writeContent,
  writePrettified
}
