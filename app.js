// express.js : https://expressjs.com/
const express = require('express');
const app = express();

// dotenv : https://www.npmjs.com/package/dotenv
require('dotenv').config();

// regist variable ROOT for another directory. Not "../../directory/path/file.name" but `${processe.env.ROOT}/directory/path/file.name`.
process.env.ROOT = __dirname;

// database pool => express.js can approach app from req. Like this "req.app" => "req.app.dbPool" = `${process.env.ROOT}/database/pool`
let dbPool = require(`${process.env.ROOT}/database/config/mysqlPool`);
app.dbPool = dbPool;
console.log("111111111", dbPool);

let redis = require(`./database/config/redis`);
app.redis = redis;

// Middleware : bodyParser, cors, static
require(`./middleware/index.js`)(app);

// Router
require(`./router/index.js`)(app).then(router => {
	app.use(router);

	app.use(function(error, req, res, next) {
		console.log(error.message);
		res.json({"error": error.message});
	});
	
	app.listen(process.env.PORT || 8000, () => {
		console.log('Server started, ', process.env.PORT || 8000);
	});
});

// unhandled server side error.
process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;