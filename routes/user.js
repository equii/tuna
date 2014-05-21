var passport = require('passport')
	, mongoose = require('mongoose')
	, userModel = mongoose.model('User');

exports.GETlogin = function(req, res) {
    if(req.isAuthenticated()){
        req.session.messages = "You are already logged in";
        return res.redirect('/');
    }
	res.render('login', {title : "Tuna: Login", msg: req.session.messages});
    req.session.messages = ''; // TODO: need to find a proper way of cleaning up passed around messages, i hear there is a middleware called flash
}

exports.POSTlogin = function(req,res,next) {
	passport.authenticate('local', function(err, user, info) {
		if(err) return next(err);

		if(!user) {
			req.session.messages = [info.message];
			return res.redirect('/login');
		}

		req.logIn(user, function(err){
			if(err) {
                return next(err);
            }
            req.session.messages = info.message;
			return res.redirect('/');
		});

	})(req,res,next);
};

exports.GETregister = function(req,res) {
    if(req.isAuthenticated()){
        req.session.messages = "You are already logged in";
        return res.redirect('/');
    }
	res.render('newuser', {title : "Tuna: registration", msg: req.session.messages});
    req.session.messages = '';
}

exports.POSTregister = function(req,res,next) {
	// creates a new instance of user model - a schema defined in models/user
    // TODO: validate this data even more and move to shared util
    if(req.body.username && req.body.username
        && req.body.username.length >=3 && req.body.username.length <= 16
        && req.body.password.length >=3 && req.body.password.length <= 16){
        var user = new userModel(req.body);
        user.save(function(err){	// saves the user into the database
            if(err){
                return next(err);
            }
        });
        console.log("Saved a new user into DB, whoohoo!");
        req.session.messages = 'Please login with your new credentials now';
        return res.redirect('/login');
    }
    req.session.messages = 'Username and password must be 3-16 characters long';
    return res.redirect('/register');
};

exports.GETlogout = function(req, res){
    req.logout();
    req.session.messages = 'Thank you, come back soon!';
    return res.redirect('/login');
};