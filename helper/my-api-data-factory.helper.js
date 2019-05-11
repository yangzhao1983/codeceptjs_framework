const directories = require('../config/directories.conf');

const ApiDataFactory = require('../node_modules/codeceptjs/lib/helper/ApiDataFactory');
const CustConfig = require('../config/cust-config');
const MyBaseRest = require('./my-base-rest.helper');
const output = require('codeceptjs').output;
const TestUtil = require('../util/test-util');
const cache = require('../lib/cache');
const Constants = require('../util/constants');

class MyApiDataFactory extends ApiDataFactory {

    constructor(config) {
        super(config);
        // Use MyBaseRest helper to avoid strictSSL issue.
        this.restHelper = new MyBaseRest(Object.assign(this.config.REST, {endpoint: this.config.endpoint}));
    }

    /**
     * Override base method to include authorization header
     * Generates a new record using factory and saves API request to store it.
     *
     * ```js
     * // create a user
     * I.have('user');
     * // create user with defined email
     * I.have('user', { email: 'user@user.com'});
     * ```
     *
     * @param {*} factory factory to use
     * @param {*} params predefined parameters
     */
    async have(factory, params) {
        let accessToken = await this._getAdminAccessToken();
        this.restHelper.haveRequestHeaders({'Authorization': 'Bearer ' + accessToken});
        return super.have(factory, params);
    }

    /**
     * Override base method to include authorization header
     * Generates bunch of records and saves multiple API requests to store them.
     *
     * ```js
     * // create 3 posts
     * I.have('post', 3);
     *
     * // create 3 posts by one author
     * I.have('post', 3, { author: 'davert' });
     * ```
     *
     * @param {*} factory
     * @param {*} times
     * @param {*} params
     */
    async haveMultiple(factory, times, params) {
        if (times > this.config.maxMultipleCreations) {
            throw new Error('Cannot create more than ' + this.config.maxMultipleCreations + ' ' + factory + 's at a time');
        }
        // Do not have to worry about access token because it will
        // internally call have which takes care of access token.
        return super.haveMultiple(factory, times, params);
    }

    async _getAdminAccessToken() {
        let name = CustConfig.adminUser.split('@')[0];
        let key = `${name}AccessToken`;
        let accessToken = cache.get(key);

        if (!accessToken) {
            let tokenPayload = TestUtil.getAccessTokenRequestPayload();
            let response = await this.restHelper.sendPostRequest(Constants.EndPoint.TOKEN, tokenPayload, {'Content-Type': Constants.Headers.CONTENT_TYPE_APP_X_WWW_FORM_URLENCODED, 'Authorization': 'Basic ' + CustConfig.testAdminAssertionToken});
            accessToken = TestUtil.getJsonFromResponse(response).access_token;
            cache.set(key, accessToken);
        } else {
            output.log('Cache hit for access token.')
        }

        return accessToken;
    }
}

module.exports = MyApiDataFactory;
