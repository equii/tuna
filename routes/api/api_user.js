var passport = require('passport')
    , mongoose = require('mongoose')
    , userModel = mongoose.model('User')
    , utils = require('../../lib/utils');

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

    var user = new userModel(req.body);
    user.save(function(err){	// saves the user into the database
        if(err){
            return res.send(400, utils(err)); // TODO parse the error in more details return 40X error codes if validation of data fails, otherwise return 500
        }
    });
    console.log("Saved a new user into DB via API, whoohoo!");
    return res.send(201);
};