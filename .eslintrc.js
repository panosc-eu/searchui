const { createConfig } = require('eslint-config-galex/dist/createConfig')
const { getDependencies } = require('eslint-config-galex/dist/getDependencies')
const {
  createJestOverride,
} = require('eslint-config-galex/dist/overrides/jest')
const {
  createReactOverride,
} = require('eslint-config-galex/dist/overrides/react')

const dependencies = getDependencies()

module.exports = createConfig({
  env: { es6: true },
  overrides: [
    createReactOverride({
      ...dependencies,
      rules: {
        'import/no-default-export': 'off', // default exports are common in React
        'unicorn/prefer-object-from-entries': 'off',
        'unicorn/new-for-builtins': 'off',
        'unicorn/prefer-set-has': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    }),
    createJestOverride({
      ...dependencies,
      rules: {
        'jest/no-focused-tests': 'warn', // warning instead of error
        'jest/prefer-strict-equal': 'off', // `toEqual` is shorter and sufficient in most cases
        'jest-formatting/padding-around-all': 'off', // allow writing concise two-line tests
        'jest/require-top-level-describe': 'off', // filename should already be meaningful, extra nesting is unnecessary
      },
    }),
  ],
})
