/* eslint-env jest */
jest.mock('fs')
jest.mock('prettier')
const fs = require('fs')
const prettier = require('prettier')
const { readContent, writeContent, writePrettified } = require('./utils')

const path = 'foo.svg'
const content = '<svg></svg>'

describe('readContent', () => {
  test('reads the file and adds the content', () => {
    fs.readFile.mockImplementation((file, enc, cb) => cb(null, content))

    readContent(path).subscribe(result => {
      expect(fs.readFile).toHaveBeenCalledWith(
        path,
        'utf8',
        expect.any(Function)
      )
      expect(result).toEqual({ path, content })
    })
  })
})

describe('writeContent', () => {
  test('writes the file content to specified file', () => {
    fs.writeFile.mockImplementation((file, content, enc, cb) => cb())

    writeContent({ path, content }).subscribe(result => {
      expect(fs.writeFile).toHaveBeenCalledWith(
        path,
        content,
        'utf8',
        expect.any(Function)
      )
      expect(result).toEqual({ path, content })
    })
  })
})

describe('writePrettified', () => {
  test('writes prettified contents', () => {
    fs.readFile.mockImplementation((file, enc, cb) => cb(null, content))
    fs.writeFile.mockImplementation((file, content, enc, cb) => cb())
    prettier.check.mockImplementation(() => false)
    writePrettified(path, {}).subscribe(result => {
      expect(prettier.check).toHaveBeenCalledWith(content, { filepath: path })
      expect(prettier.format).toHaveBeenCalledWith(content, { filepath: path })
    })
  })
  test('leaves already pretty content untouched', () => {
    fs.readFile.mockImplementation((file, enc, cb) => cb(null, content))
    fs.writeFile.mockImplementation((file, content, enc, cb) => cb())
    prettier.check.mockImplementation(() => true)
    writePrettified(path, {}).subscribe(result => {
      expect(prettier.check).toHaveBeenCalledWith(content, { filepath: path })
      expect(prettier.format).not.toHaveBeenCalled()
    })
  })
})
