var passport = require('passport')
	, db = require('../db/db');

exports.login = function(req,res) {
	res.render('login', {user: req.user, message: req.session.messages});
}

exports.postLogin = function(req,res,next) {
	passport.authenticate('local', function(err, user, info) {
		if(err) return next(err);

		console.log('user: ' + user);

		console.log('info: ' + info);

		if(!user) {
			req.session.messages = [info.message];
			return res.redirect('/login');
		}

		req.logIn(user, function(err){
			if(err) {return next(err);}

			return res.redirect('/');
		});

	})(req,res,next);
};

exports.create = function(req,res,next) {
	console.log(Date()+ " Creating user " + req.body.in_username);
	db.createUserInDB(req.body.in_username, req.body.in_password, function(cb_user){
		console.log(Date() + " Created user " + req.body.in_username);
		console.log("Callback value of user: " + cb_user);
	});	
	res.redirect('/login');
};