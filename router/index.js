const router = require('express').Router();
const routes = require('fs').readdirSync(`${__dirname}/routes`);

module.exports = async (app) => {
	for (const route of routes) {
		let functions = [];
		const { method, url, logic, auth, bucket, uploadFolder } = require(`./routes/${route}`)();
		// app.logic = logic;
		if (auth) { functions.push(app.auth); } // middleware/index.js => already registed : app.auth = function (req, res, next) {...}

		// if (uploadFolder) { functions.push(app.upload(bucket, uploadFolder)); }
		app.logic = logic;
		functions.push(app.transaction);
		
		router[method](url, ...functions); // auth(req, res, next) => upload(req, res, next) => trans(...) => logic(...)
	}

	return router;
};