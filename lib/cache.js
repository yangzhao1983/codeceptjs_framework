const LruCache = require('lru-cache');
const options = {
    // Max items in cache.
    max: 10,
    // 55 mins (in msecs) because access tokens are valid for 1 hr.
    maxAge: 55*60*1000
}

/* Singleton - Node.js will cache this instance and
 * return the same instance whenever require'd.
 */
module.exports = LruCache(options);