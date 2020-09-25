const express = require('express');
const app = express();
require('dotenv').config();
process.env.ROOT = __dirname;
const dbPool = require(`${process.env.ROOT}/database/pool`);
app.dbPool = dbPool;
// const redis = require(`${process.env.ROOT}/database/redis`);
// app.redis = redis;

require(`./middleware/index.js`)(app);
require(`./router/index.js`)().then(router => {
	app.use(router);

	app.use(function(error, req, res, next) {
		console.log(error.message);
		res.json({"error": error.message});
	});
	
	app.listen(process.env.port || 8000, () => {
		console.log('Server started, ', process.env.port || 8000);
	});
});

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;