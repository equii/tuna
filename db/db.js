var app = require('../app');
var mongoose = require('mongoose');

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

var Messages = mongoose.model('messages', messageSchema, 'test2');



// This is called to init the database
exports.dbinit = function(){
	console.log(app);
	mongoose.connect('mongodb://localhost/mydb');
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function callback () {
  		console.log("Connected to db");
  	});
}

exports.findMessages = function(){
		console.log(Messages.db.connections);
		Messages.find({userout : /user1/, text : /message 2733/}, function(err, result){
  			console.log(result);
  		});
}





