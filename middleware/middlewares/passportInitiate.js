const session = require('express-session');
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
// var FacebookStrategy = require('passport-facebook').Strategy
	
// 소셜 로그인 라이브러리 초기화
module.exports = (app) => {
	app.use(passport.initialize());
	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_REDIRECT_URI,
		state: true
		},
		async function(accessToken, refreshToken, profile, done) { // done???
			console.log('accessToken', accessToken);
			return done(null, profile, accessToken); // 콜백이 수행되면 처리되는 영역, 뭔가를 한다. ex) 데이터베이스에 로그인 상태를 기억하거나 레디스에 올리거나.
		}
	));
	
	// passport.use(new FacebookStrategy({
	// 	clientID: process.env.FACEBOOK_APP_ID,
	// 	clientSecret: process.env.FACEBOOK_APP_SECRET,
	// 	callbackURL: process.env.FACEBOOK_REDIRECT_URI,
	// 	state: true
	// 	},
	// 	function(accessToken, refreshToken, profile, done) {
	// 		return done(null, profile);
	// 	}
	// ));
};