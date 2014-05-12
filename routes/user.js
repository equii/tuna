var passport = require('passport')
	, mongoose = require('mongoose')
	, userModel = mongoose.model('User');

exports.login = function(req,res) {
	res.render('login', {title : "Please login", user: req.user, message: req.session.messages});
}

exports.postLogin = function(req,res,next) {
	// TODO: create the authentication logic here
	console.log("exports.postLogin");
	passport.authenticate('local', function(err, user, info) {
		console.log('passport.authenticate callback user ' + err);
		console.log('passport.authenticate callback user ' + user);
		console.log('passport.authenticate callback info ' + info);
		if(err) return next(err);

		if(!user) {
			req.session.messages = [info.message];
            console.log("info.message is " + info.message)
			return res.redirect('/login');
		}

		req.logIn(user, function(err){
            console.log("info.message is " + info.message)
			if(err) {
                return next(err);
            }

            req.session.messages = info.message;

			return res.redirect('/');
		});

	})(req,res,next);
};

exports.create = function(req,res) {
	res.render('newuser');
}

exports.postCreate = function(req,res,next) {
	// creates a new instance of user model - a schema defined in models/user
	var user = new userModel(req.body);
	console.log("exports.create: Printing user schema object " + user);
	user.save(function(err){	// saves the user into the database
		if(err){
			console.log("exports.create: Error creating saving user " + err);
			return res.render('create');
		}
	});
	console.log("Saved a new user into DB, whoohoo!");
	return res.redirect('/login');
};