var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy
    , mongoose = require('mongoose')
    , userModel = mongoose.model('User');


passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id,done){
    userModel.findOne({ _id: id }, function (err, user) {
        done(err, user)
    });
});

passport.use(new LocalStrategy(function(username, password, done) {
	// Finding user in db model

    userModel.findOne({username:username}, function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
            done(null, false, {message : "Authentication failed: user not found"});
        }
        if(user.password != password){ //TODO rewrite this to compare password hash, preferably move to user model
            done(null, false, {message : "Authentication failed: password mismatch"}); //TODO: clean this up, using for debug purposes only
        }
        return done(null, user, {message : "Authentication success"});
    });
}));

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){ return next(); }
	res.redirect('/login');
}