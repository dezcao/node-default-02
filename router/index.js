const router = require('express').Router();
const routes = require('fs').readdirSync(`${process.env.ROOT}/router/routes`);
const authenticate = require(`${process.env.ROOT}/middleware/authenticate`);
const multerUpload = require(`${process.env.ROOT}/middleware/multerUpload`);
const transaction = require(`${process.env.ROOT}/middleware/transaction`);
const passport = require('passport');

let init = async function(req, res, next) {
	router.get('/', function(req, res, next) {
		res.json({msg: 'hello~!! root'});
	});
	
	router.get('/login/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
	router.get('/login/oauth2/code/google', function(req, res, next) {
		passport.authenticate("google", (err, profile, accessToken) => {
			if (err) {
				return next(err);
			}
			if (!profile) {
				// return res.redirect("/login");
				return res.status(400).json({data: null});
			}
			res.status(200).json({data: profile});
		})(req, res, next);
	});
	
	for (const route of routes) {
		let middleWares = [];
		const { method, url, func, auth, storageFolder, trans } = require(`${process.env.ROOT}/router/routes/${route}`)();
		if (auth) {
			middleWares.push(authenticate);
		}
		
		if (storageFolder) {
			middleWares.push(multerUpload(storageFolder).array('file', 10));
		} 
		
		middleWares.push(trans ? transaction(func) : function (req, res, next) {
			func(req, res, next).catch(next);
		});
		
		router[method](url, require('cors')(), ...middleWares);
	}
}

module.exports = async () => {
	await init();
	return router;
};