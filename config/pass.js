var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy
	, db = require('../db/db');


passport.serializeUser(function(user, done){
	done(null, 1);
});

passport.deserializeUser(function(id,done){
	//db.getbyid...
	done(null, {username: 'test', password: 'test'});
});

passport.use(new LocalStrategy(function(username, password, done) {
	// Finding user in db
	console.log('Passport.use with data username +pass = ' + username + ' ' + password);
	
	
	// db.authenticateUserInDB(username, password, function(found, user){
	// 	if(found){
	// 		console.log("Finished searching in db and found match");
	// 		return done(null, {username: user.username, password: user.password});
	// 	}
	// 	else
	// 		return done(null, false, {message: 'Error'});
	// });
}));

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){ return next(); }
	res.redirect('/login');
}