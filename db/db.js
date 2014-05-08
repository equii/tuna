var mongoose = require('mongoose');

// This is called from app.js to init the database
exports.dbinit = function(){
	mongoose.connect('mongodb://tunadbRWUser:tunapassword1!@tunadbtest01.cloudapp.net:16666/tunadb?ssl=true&authSource=admin', 
		{ server: { socketOptions: { keepAlive: 1 } } });
	var db = mongoose.connection;

	db.on('error', function(err){
		console.log("Database connection error. Details:")
		console.log(err);
	});

	db.on('disconnected', function () {
  		connect()
	});

	db.once('open', function callback () {
  		console.log("Database connection established");
  	});
}






