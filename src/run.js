const { pass, fail } = require('create-jest-runner')
const prettier = require('prettier')
const { from, of } = require('rxjs')
const { catchError, mapTo, mergeMap } = require('rxjs/operators')

const { writePrettified } = require('./utils')

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
