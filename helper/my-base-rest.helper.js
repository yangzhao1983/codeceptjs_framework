const Rest = require('../node_modules/codeceptjs/lib/helper/REST');
const TestUtil = require('../util/test-util');
const unirest = require('unirest');

let request;

/**
 * IMPORTANT - This helper is to be used with MyApiDataFactory!
 * This is not returning promise in _executeRequest.
 *
 * This class overrides some of the rest helpers from codeceptjs
 * so as to not use strictSSL. This should be an enhancement for
 * codeceptjs as it should allow configuration parameter for strictSSL.
 *
 * This also overrides post, put and patch methods because it seems that
 * content-type header must be set before you set the payload in request
 * otherwise unirest would covert json to url-encoded data. This is a bug
 * in original REST helper? It won't work by setting it in defaultHeaders
 * config as well because those headers are added too late in executeRequest
 * by when payload is already added in the request body.
 *
 */
class MyBaseRest extends Rest {

    sendPostRequest(url, payload = {}, headers = {'Content-Type': 'application/json'}) {
        request = unirest.post(this._url(url)).headers(headers).send(payload);
        return this._executeRequest(request);
    }

    sendPutRequest(url, payload = {}, headers = {'Content-Type': 'application/json'}) {
        request = unirest.put(this._url(url)).headers(headers).send(payload);
        return this._executeRequest(request);
    }

    sendPatchRequest(url, payload = {}, headers = {'Content-Type': 'application/json'}) {
        request = unirest.patch(this._url(url)).headers(headers).send(payload);
        return this._executeRequest(request);
    }

    /**
     * Override base method,
     * set strictSSL to false and
     * process response before returning
     * Executes unirest request
     *
     * @param {*} request
     */
    _executeRequest(request) {
        let newRequest = request;

        if (request.options.body) {
            let newRequest = Object.assign({}, request);
            newRequest.options = Object.assign({}, request.options);

            newRequest.options.body = TestUtil.processExpressionsInData(newRequest.options.body);
        }

        return super._executeRequest(newRequest.strictSSL(false));
    }
}

module.exports = MyBaseRest;