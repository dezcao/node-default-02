const fs = require('fs');
const uses = fs.readdirSync(`${__dirname}/use`);
const others = fs.readdirSync(`${__dirname}/others`);
const customs = fs.readdirSync(`${__dirname}/customs`);

module.exports = (app) => {

	// npm library Usage of app.use(library);
	for (const middleware of uses) {
		app.use(require(`./use/${middleware}`));
	}

	// auth, upload, transaction
	for (const custom of customs) {
		console.log(custom);
		app[custom.slice(0,-3)] = require(`./customs/${custom}`);
	}
	console.log(app.auth);
	// social login etc.
	// for (const other of others) {
		
	// }
};