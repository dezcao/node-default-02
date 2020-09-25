const fs = require('fs');
const fileNames = fs.readdirSync(`${process.env.ROOT}/businessLogicLayer/logics`);

const logicObj = () => {
	let logicObject = {};
	for (const fileName of fileNames) {
		console.log(fileName);
		logicObject[fileName.slice(0,-3)] = require(`${process.env.ROOT}/businessLogicLayer/logics/${fileName}`);
	}
	return logicObject;
};

module.exports = logicObj();