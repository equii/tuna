var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

// TODO: add more validation methods when saving
// need things like hashing the password, authenticating etc.

mongoose.model('User', userSchema)