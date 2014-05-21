var passport = require('passport')
    , mongoose = require('mongoose')
    , userModel = mongoose.model('User');

exports.POSTlogin = function(req, res, next) {
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

exports.GETlogout = function(req, res){
    req.logout();
    return res.send(200, "Logout successful");
};

exports.POSTregister = function(req,res,next) {
    // creates a new instance of user model - a schema defined in models/user
    // TODO: check the incoming data here even more
    if(req.body.username && req.body.username
        && req.body.username.length >=3 && req.body.username.length <= 16
        && req.body.password.length >=3 && req.body.password.length <= 16){
        var user = new userModel(req.body);
        user.save(function(err){	// saves the user into the database
            if(err){
                return res.send(500);
            }
        });
        console.log("Saved a new user into DB via API, whoohoo!");
        return res.send(201);
    }
    return res.send(400);
};