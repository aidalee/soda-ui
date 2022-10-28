module.exports = {
  presets: [
    [
      '@soda/cli/preset',
      {
        loose: process.env.NODE_ENV === 'compile'
      }
    ]
  ]
}
