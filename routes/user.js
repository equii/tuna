var passport = require('passport');

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