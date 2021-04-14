const fs = require('fs');
console.log(__dirname);
const uses = fs.readdirSync(`${__dirname}/use`);
const customs = fs.readdirSync(`${__dirname}/customs`);

module.exports = (app) => {

	// npm library Usage of app.use(library);
	for (const middleware of uses) {
		app.use(require(`./use/${middleware}`));
	}

	// auth, upload, transaction
	for (const custom of customs) {
		app[custom.slice(0,-3)] = require(`./customs/${custom}`);
		console.log(custom);
	}
	
	// social login etc.
	// for (const other of others) {
	// }
};