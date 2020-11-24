const fs = require('fs');
const fileNames = fs.readdirSync(`${process.env.ROOT}/service/logic`);

const logicObj = () => {
	let logicObject = {};
	for (const fileName of fileNames) {
		logicObject[fileName.slice(0,-3)] = require(`${process.env.ROOT}/service/logic/${fileName}`);
	}
	return logicObject;
};

module.exports = logicObj();