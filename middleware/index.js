const path = require('path');
const defaultMiddlewares = [
	'static',
	'bodyParser',
	'bodyParserForJson',
	'bodyParserForRaw',
	'bodyParserForText',
	'cors'
];
// const session = require('express-session'); // state : true
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
module.exports = (app) => {
	app.use(passport.initialize());
	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_REDIRECT_URI,
		state: false
		},
		async function(accessToken, refreshToken, profile, done) {
			console.log('accessToken', accessToken);
			return done(null, profile, accessToken); // 콜백이 수행되면 처리되는 영역, 뭔가를 한다. ex) 데이터베이스에 로그인 상태를 기억하거나 레디스에 올리거나.
		}
	));
	
	for (const middleware of defaultMiddlewares) {
		console.log(middleware);
		app.use(require(path.join(__dirname, 'middlewares', `${middleware}.js`)))
	}
};
