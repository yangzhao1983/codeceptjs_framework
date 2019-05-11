const Constants = require('./constants');
const CustConfig = require('../config/cust-config');
class TestUtil {

    /*
     * This method will return Json from unirest response.
     * We only need response body.
     *
     * response from uirest includes:
     *  1. status
     *  2. error if exist
     *  3. body
     *  4. header
     */
    static getJsonFromResponse(response) {
        if (!response.status && response.error) {
            throw new Error(response.error.code + ' ' + response.error.message);
        }
        if (response.status < 200 || response.status > 499) {

            // This is error case.
            if (response.error) {
                output.print('Error message: ', response.error.message);
                output.print('Response headers: ', response.headers);
                output.print('Response body: ', response.body);
                throw new Error(response.error.message);
            } else {
                output.print('Error response is ', response.body);
                throw new Error('Rest Error: ' + response.status);
            }
        }
        return response.body;
    }

    /*
     * This method will resolve all expressions.
     */
    static processExpressionsInData(data) {

        // Use an array to support more expressions in future.
        const expressionList = ['{{unique}}', '{{otherParamName}}'];

        let processedObject = {},
            toBeProcessedString = data,
            processedString = '';

        if (typeof data === 'function') {

            // It is a page object.
            return data;
        }

        if (typeof data !== 'string') {
            toBeProcessedString = JSON.stringify(data);
        }

        // Again callback. Similar to function interface brought in jdk8
        const isExpressionExist = expressionList.some(expression => toBeProcessedString.indexOf(expression) !== -1);

        // Process only if data has expression.
        if (isExpressionExist) {

            // Process all expressions here one by one.
            processedString = this.processUniqueExpressionsInString(toBeProcessedString);

            // TODO: process 'other parameter name?'

            if (typeof data === 'string') {
                processedObject = processedString;
            } else {
                processedObject = JSON.parse(processedString);
            }
        } else {

            /*
             * Data did not contain any expressions.
             * Just return data.
             */
            processedObject = data;
        }

        return processedObject;
    }

    /*
     * This method will resolve all unique expressions {{unique}}.
     */
    static processUniqueExpressionsInString(dataString) {
        const formattedDate = new Date().toISOString().replace(/[-:.]/g, '');
        return dataString.replace(/{{unique}}/g, formattedDate);
    }

    /*
     * Return true if tokenType is 'me' or 'admin'
     */
    static isTokenTypeForUser(tokenType) {
        return tokenType.toLowerCase() === Constants.TokenType.ME ||
            tokenType.toLowerCase() === Constants.TokenType.ADMIN;
    }

    /*
     * Return token from cache. If not found in cache, get new access
     * token and put it in cache.
     *
     * In our project, each type of token is used to achieve specific function respectively.
     *
     */
    static getAccessTokenRequestPayload(tokenType = Constants.TokenType.ADMIN,
                                        username = CustConfig.adminUser,
                                        password = CustConfig.adminPassword) {
        let clientId = '',
            assertionToken = '';

        if (tokenType.toLowerCase() === Constants.TokenType.ME) {
            assertionToken = CustConfig.testMeAssertionToken;
            clientId = CustConfig.testMeClientId;
        } else if (tokenType.toLowerCase() === Constants.TokenType.ADMIN) {
            assertionToken = CustConfig.testAdminAssertionToken;
            clientId = CustConfig.testAdminClientId;
        } else if (tokenType.toLowerCase() === Constants.TokenType.INTERNAL) {
            assertionToken = CustConfig.testInternalAssertionToken;
            clientId = CustConfig.testInternalClientId;
        } else if (tokenType.toLowerCase() === Constants.TokenType.INFRA) {
            assertionToken = CustConfig.testInfraAssertionToken;
            clientId = CustConfig.testInfraClientId;
        }

        const postData = {
            'scope': Constants.Scopes.MY_CONSOLE_SCOPE
        };

        // OIDC related protocol
        if (tokenType.toLowerCase() === Constants.TokenType.INTERNAL) {
            postData['grant_type'] = 'client_credentials';
        } else {
            if (!this.isTokenTypeForUser(tokenType)) {
                /* eslint-disable dot-notation */
                postData['client_id'] = clientId;
                postData['grant_type'] = 'client_credentials';
                /* eslint-enable dot-notation*/
            } else {
                /* eslint-disable dot-notation */
                postData['grant_type'] = 'password';
                /* eslint-enable dot-notation*/
            }

            if (this.isTokenTypeForUser(tokenType)) {
                postData.username = username || CustConfig.adminUser;
                postData.password = password || CustConfig.adminPassword;
            } else {
                /* eslint-disable dot-notation */
                postData['client_assertion'] = assertionToken;
                postData['client_assertion_type'] = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
                /* eslint-enable dot-notation*/
            }
        }
        return postData;
    }
}

module.exports = TestUtil;