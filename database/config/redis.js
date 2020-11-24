const fromRedis = require('redis');
const { promisify } = require("util");
const redis = fromRedis.createClient({
			host: process.env.REDIS_HOST,
			port: 6379,
			password: process.env.REDIS_PASS
        });
redis.getAsync = promisify(redis.get).bind(redis);
module.exports = redis;
