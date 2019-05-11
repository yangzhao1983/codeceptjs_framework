const directories = require('./directories.conf');
const CustConfig = require('./cust-config');
module.exports = {
    'REST': {
        'timeout': 10000,
        'resetHeaders': true
    },
    'endpoint': CustConfig.endpoint,
    'cleanup': false,
    'factories': {
        'user': {
            'uri': '/admin/v1/Users',
            'factory': `${directories.factories}/user.factory`
        }
    },
    'maxMultipleCreations': 100,
    'require': `${directories.helper}/my-api-data-factory.helper`
};