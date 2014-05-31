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

passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
    },
    function(email, password, done) {
	// Finding user in db model

    userModel.findOne({email:email}, function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message : "We couldn't find you, please try again"});
        }
        if(!user.authenticate(password)){
            return done(null, false, {message : "We couldn't find you, please try again"});
        }
        return done(null, user);
    });
}));

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){ return next(); }
	res.redirect('/login');
}