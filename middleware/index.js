const fs = require('fs');
const uses = fs.readdirSync(`${process.env.ROOT}/middleware/use`);
const others = fs.readdirSync(`${process.env.ROOT}/middleware/others`);
const customs = fs.readdirSync(`${process.env.ROOT}/middleware/customs`);

module.exports = (app) => {

	// npm library Usage of app.use(library);
	for (const middleware of uses) {
		app.use(require(`${process.env.ROOT}/middleware/use/${middleware}`));
	}

	// auth, upload, transaction
	for (const custom of customs) {
		console.log(custom);
		app[custom.slice(0,-3)] = require(`${process.env.ROOT}/middleware/customs/${custom}`);
	}
	console.log(app.auth);
	// social login etc.
	// for (const other of others) {
		
	// }
};