module.exports = {
    extends: ['eslint-config-airbnb-base'].map(require.resolve),
    parserOptions: {
      sourceType: 'script',
      ecmaFeatures: {
        experimentalObjectRestSpread: false,
      },
    },
    env: {
      node: true,
    },
    rules: {
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
      'strict': 'off',
    },
  };