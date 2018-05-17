/* eslint-env jest */
jest.mock('fs')
const fs = require('fs')
const { readContent, writeContent } = require('./utils')

describe('readContent', () => {
  test('reads the file and adds the content', () => {
    const fileContent = '<svg></svg>'
    fs.readFile.mockImplementation((file, enc, cb) => cb(null, fileContent))
    const file = 'foo.svg'

    readContent(file).subscribe(result => {
      expect(fs.readFile).toHaveBeenCalledWith(
        file,
        'utf8',
        expect.any(Function)
      )
      expect(result).toEqual({
        file,
        content: fileContent
      })
    })
  })
})

describe('writeContent', () => {
  test('writes the file content to specified file', () => {
    const file = 'foo.svg'
    const content = '<svg></svg>'
    fs.writeFile.mockImplementation((file, content, enc, cb) => cb())

    writeContent({ file, content }).subscribe(result => {
      expect(fs.writeFile).toHaveBeenCalledWith(
        file,
        content,
        'utf8',
        expect.any(Function)
      )
      expect(result).toEqual({ file, content })
    })
  })
})
