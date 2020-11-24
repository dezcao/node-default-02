module.exports = async function (req, res, next) {
	console.log('do something auth process');
	if (true) { // this is just sample. so, always success.
		next();
	} else {
		res.json({msg: "auth check fail message"});
	}
}