var passport = require('passport')
    , mongoose = require('mongoose')
    , userModel = mongoose.model('User');

exports.login = function(req, res, next) {
    if(req.isAuthenticated()) {
        return res.send(200, "You are already authenticated");
    }
    passport.authenticate('local', function(err, user, info) {
        if(err){
            return next(err);
        }

        if(!user) {
            return res.send(401);
        }

        req.logIn(user, function(err){
            if(err) {
                return next(err);
            }
            return res.send(200, "Authentication success");
        });

    })(req,res,next);
};