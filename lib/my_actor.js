// in this file you can append custom step methods to 'I' object
const cache = require('../lib/cache');
const TestUtil = require('../util/test-util');
const CustConfig = require('../config/cust-config');
const Constants = require('../util/constants');
module.exports = function () {
    return actor({

        // Define custom steps here, use 'this' to access default methods of I.
        // It is recommended to place a general 'login' function here.
        async haveAuthorizationHeader(options) {
            if (!(options && options.tokenType)) {
                throw new Error('You need to pass options.tokenType to haveAuthorizationHeader');
            }

            // Get key to retrieve access token from cache.
            let key = '',
                name = '',
                assertionToken = '';

            if (options.tokenType.toLowerCase() === Constants.TokenType.ME) {
                name = options.username.split('@')[0];
                key = `${name}AccessToken`;
                assertionToken = CustConfig.testMeAssertionToken;
            } else if (options.tokenType.toLowerCase() === Constants.TokenType.ADMIN) {
                name = name.split('@')[0];
                key = `${name}AccessToken`;
                assertionToken = CustConfig.testAdminAssertionToken;
            } else if (options.tokenType.toLowerCase() === Constants.TokenType.INTERNAL) {
                key = 'testInternalAccessToken';
                assertionToken = CustConfig.testInternalAssertionToken;
            } else if (options.tokenType.toLowerCase() === Constants.TokenType.INFRA) {
                key = 'testInfraAccessToken';
                assertionToken = CustConfig.testInfraAssertionToken;
            } else {
                throw new Error(`Invalid tokenType: ${options.tokenType}`);
            }

            let accessToken = cache.get(key);

            if (!accessToken) {
                // Does not exist or expired. Get new access token.
                let postData = TestUtil.getAccessTokenRequestPayload(options.tokenType,
                    options.username, options.password);

                let httpHeaders = {'Content-Type': Constants.Headers.CONTENT_TYPE_APP_X_WWW_FORM_URLENCODED};

                if (options.tokenType.toLowerCase() !== 'infra') {
                    httpHeaders['Authorization'] = 'Basic ' + assertionToken;
                }

                let response = await this.sendPostRequest('/oauth2/v1/token', postData, httpHeaders);

                accessToken = response.access_token;
                // Save new access token in cache.
                cache.set(key, accessToken);
            } else {
                output.log('Cache hit for access token.')
            }

            this.haveRequestHeaders({'Authorization': 'Bearer ' + accessToken});
        },

    });
}
