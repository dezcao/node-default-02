const fs = require('fs');
const fileNames = fs.readdirSync(`./logic`);

const logicObj = () => {
	let logicObject = {};
	for (const fileName of fileNames) {
		logicObject[fileName.slice(0,-3)] = require(`./logic/${fileName}`);
	}
	return logicObject;
};

module.exports = logicObj();