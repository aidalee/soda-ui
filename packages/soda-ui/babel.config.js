module.exports = {
  presets: [
    [
      '@soda-f2e/cli/preset',
      {
        loose: process.env.NODE_ENV === 'compile'
      }
    ]
  ]
}
