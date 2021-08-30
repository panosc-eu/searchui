const { createConfig } = require('eslint-config-galex/src/createConfig');
const {
  files: reactFiles,
} = require('eslint-config-galex/src/overrides/react');

module.exports = createConfig({
  overrides: [
    {
      files: reactFiles,
      rules: {
        'import/no-default-export': 'off', // default exports are common in React
      },
    },
  ],
});
