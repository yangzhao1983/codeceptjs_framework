const MyApiDataConf = require('./my-api-data-factory.conf');
const MyRestConf = require('./my-rest.conf');
exports.config = {
  tests: '../*.e2e.js',
  output: '../output',
  helpers: {
    'MyRest':MyRestConf,
    'MyApiDataFactory':MyApiDataConf,
    WebDriverIO: {
      url: 'https://localhost',
      browser: 'chrome',
        desiredCapabilities: {

        }
    }
  },
  include: {
    I: '../lib/my_actor.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'codeceptjs_framework'
}
