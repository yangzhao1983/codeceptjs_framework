const path = require('path');
const e2eDirectory = path.resolve(__dirname, '..');
module.exports = {
    'lib': `${e2eDirectory}/lib`,
    'config': `${e2eDirectory}/config`,
    'factories': `${e2eDirectory}/factories`,
    'helper': `${e2eDirectory}/helper`,
    'util': `${e2eDirectory}/util`
};