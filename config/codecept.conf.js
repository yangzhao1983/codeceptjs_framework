const MyApiDataConf = require('./my-api-data-factory.conf');
const MyRestConf = require('./my-rest.conf');
const mochawesomeConf = require('./mochawesome.conf');
exports.config = {
  tests: '../*.e2e.js',
  output: '../output',
  helpers: {
    'MyRest':MyRestConf,
    'MyApiDataFactory':MyApiDataConf,
      'Mochawesome': mochawesomeConf,
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
