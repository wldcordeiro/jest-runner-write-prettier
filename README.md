# jest-runner-write-prettier

## Usage

### Install

Install `jest`_(it needs Jest 21+)_ and `jest-runner-write-prettier`

```bash
yarn add --dev jest jest-runner-write-prettier

# or with NPM

npm install --save-dev jest jest-runner-write-prettier
```

### Add it to your Jest config

In your `package.json`

```json
{
  "jest": {
    "runner": "jest-runner-write-prettier",
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "ts",
      "tsx",
      "css",
      "less",
      "scss",
      "graphql",
      "md",
      "markdown"
    ],
    "testMatch": [
      "**/*.js",
      "**/*.jsx",
      "**/*.json",
      "**/*.ts",
      "**/*.tsx",
      "**/*.css",
      "**/*.less",
      "**/*.scss",
      "**/*.graphql",
      "**/*.md",
      "**/*.markdown"
    ]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  runner: 'jest-runner-write-prettier',
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
    '**/*.js',
    '**/*.jsx',
    '**/*.json',
    '**/*.ts',
    '**/*.tsx',
    '**/*.css',
    '**/*.less',
    '**/*.scss',
    '**/*.graphql',
    '**/*.md',
    '**/*.markdown'
  ]
}
```

### Run Jest

```bash
yarn jest
```
