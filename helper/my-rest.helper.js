const MyBaseRest = require('./my-base-rest.helper');
const output = require('codeceptjs').output;
const TestUtil = require('../util/test-util');

class MyRest extends MyBaseRest {

    /**
     * Override base method,
     * process response before returning
     * Executes unirest request
     *
     * @param {*} request
     */
    async _executeRequest(request) {
        let response = await super._executeRequest(request);
        return TestUtil.getJsonFromResponse(response);
    }
}

module.exports = MyRest;