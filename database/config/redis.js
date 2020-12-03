const fromRedis = require('redis');
const { promisify } = require("util");
if (process.env.REDIS_HOST) {
	const redis = fromRedis.createClient({
		host: process.env.REDIS_HOST,
		port: 6379,
		password: process.env.REDIS_PASS
	});
	redis.getAsync = promisify(redis.get).bind(redis);
	module.exports = redis;
} else {
	module.exports = null;
}