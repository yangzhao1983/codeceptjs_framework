const directories = require('./directories.conf');
const CustConfig = require('./cust-config');
module.exports = {
    'endpoint': CustConfig.endpoint,
    'timeout': 10000,
    'pollTimeout': 60000,
    'resetHeaders': true,
    'followRedirect': false,
    'require': `${directories.helper}/my-rest.helper`
}