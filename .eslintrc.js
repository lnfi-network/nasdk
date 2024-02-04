module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  overrides: [
    {
      env: {
        node: true,
        es2021: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}
