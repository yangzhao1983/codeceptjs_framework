const API_VERSION = 'v1';
const Constants = {
    Schema: {
        USER_CORE: 'urn:ietf:params:scim:schemas:core:2.0:User',
        USER_EXTENSION: 'urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User',
        USER_STATE: 'urn:ietf:params:scim:schemas:oracle:idcs:extension:userState:User'
    },
    TokenType: {
        ADMIN: 'admin',
        ME: 'me',
        INTERNAL: 'internal',
        INFRA: 'infra'
    },
    Scopes: {
        MY_CONSOLE_SCOPE: 'urn:opc:idm:__myscopes__'
    },
    EndPoint: {
        TOKEN: '/oauth2/v1/token'
    },
    Headers: {
        CONTENT_TYPE_APP_X_WWW_FORM_URLENCODED: 'application/x-www-form-urlencoded',
        CONTENT_TYPE_APP_JSON: 'application/json'
    }
};

module.exports = Constants;