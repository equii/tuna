var passport = require('passport')
	, mongoose = require('mongoose')
	, userModel = mongoose.model('User');

exports.login = function(req, res) {
    if(req.isAuthenticated()){
        req.session.messages = "You are already logged in";
        return res.redirect('/');
    }
	res.render('login', {title : "Tuna: Login", msg: req.session.messages});
    req.session.messages = ''; // TODO: need to find a proper way of cleaning up passed around messages, i hear there is a middleware called flash
}

exports.postLogin = function(req,res,next) {
	console.log("exports.postLogin");
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

exports.create = function(req,res) {
    if(req.isAuthenticated()){
        req.session.messages = "You are already logged in";
        return res.redirect('/');
    }
	res.render('newuser', {title : "Tuna: registration"});
}

exports.postCreate = function(req,res,next) {
	// creates a new instance of user model - a schema defined in models/user
	var user = new userModel(req.body);
	user.save(function(err){	// saves the user into the database
		if(err){
			return res.render('create');
		}
	});
	console.log("Saved a new user into DB, whoohoo!");
	return res.redirect('/login');
};

exports.logout = function(req, res){
    req.logout();
    req.session.messages = 'Thank you, come back soon!';
    return res.redirect('/login');
};