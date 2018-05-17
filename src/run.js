const { pass, fail } = require('create-jest-runner')
const prettier = require('prettier')
const { from, of } = require('rxjs')
const { catchError, mapTo, mergeMap } = require('rxjs/operators')

const { readContent, writeContent } = require('./utils')

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

module.exports = ({ testPath }) => {
  const start = new Date()
  return from(prettier.resolveConfig(testPath))
    .pipe(
      mergeMap(config => writePrettified(testPath, config)),
      mapTo(
        pass({
          start,
          end: new Date(),
          test: { path: testPath }
        })
      ),
      catchError(err =>
        of(
          fail({
            start,
            end: new Date(),
            test: {
              path: testPath,
              errorMessage: `Failed to prettify: ${err}`
            }
          })
        )
      )
    )
    .toPromise()
}
