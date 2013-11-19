var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done){
	done(null, 1);
});

passport.deserializeUser(function(id,done){
	//db.getbyid...
	done(null, {username: 'test', password: 'test'});
});

passport.use(new LocalStrategy(function(username, password, done) {
	//TODO: find user etc
	console.log('1fdf');
	console.log('username +pass = ' + username + ' ' + password);
	if(username === 'test' && password === 'test')
		return done(null, {username: 'test', password: 'test'});

	return done(null, false, {message: 'Error'});
}));

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){ return next(); }
	res.redirect('/login');
}