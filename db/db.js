var mongoose = require('mongoose');
//module.exports = mongoose;

/*
	Defining the schema for a chat message
*/
var Schema = mongoose.Schema;
var messageSchema = new Schema({
	text: String,
	datetime: Date,
	userout : String,
	userin : String
});
var Messages = mongoose.model('messages', messageSchema, 'messages');

exports.findMessages = function(){
		console.log("Getting some messages...");
		Messages.find({userout : /user1/, text : /message 2733/}, function(err, result){
  			console.log(result);
  		});
}
/*
	Defining a schema for a user
*/
var userSchema = new Schema({
	username: String,
	createdatetime: Date,
	email : String,
	password : String, // going to use cleartext for now, TODO bsync
	isactive : Boolean
});
var Users = mongoose.model('users', userSchema, 'users');

exports.authenticateUserInDB = function(candidate_user, candidate_password, callback){	
	console.log("Trying to authenticate candidate " + candidate_user);
	Users.find({username:candidate_user, password:candidate_password}, function(err, result){
		if(err) throw err;
		console.log("Logging result of query");
		console.log(result);
		if(result.length==1)
			callback(true, result);
		else
			callback(false);
	});
}

exports.createUserInDB = function(in_user, in_password, callback){
	var u = new Users({username:in_user, createdatetime:Date(), email:"testmail@test.com", password:in_password, isactive:true});
	u.save(function(err, us){
		if(err) throw err;
		console.log(Date() + " Saved " + us);
		callback(us);
	});
}

// This is called to init the database
exports.dbinit = function(){
	mongoose.connect('mongodb://tunadbRWUser:tunapassword1!@tunadbtest01.cloudapp.net:16666/tunadb?ssl=true&authSource=admin');
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'DB connection error'));

	db.once('open', function callback () {
  		console.log("Connected to db");
  	});
}






