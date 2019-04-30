exports.config = {
  tests: './*.e2e.js',
  output: './output',
  helpers: {
    WebDriverIO: {
      url: 'http://localhost',
      browser: 'chrome',
        desiredCapabilities: {

        }
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'codeceptjs_framework'
}