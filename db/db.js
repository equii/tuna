var mongoose = require('mongoose');
var config = require('../config');

// This is called from app.js to init the database
exports.dbinit = function(uselocaldb){
    var connectionString = '';

    var connect = function(connString){
        mongoose.connect(connString,
            { server: { socketOptions: { keepAlive: 1 } } });
    }

    if(uselocaldb){
        console.log("Opening connection to LOCAL mongodb instance: " + config.db.mongodb_local);
        connect(config.db.mongodb_local);
    }
    else{
        console.log("Opening connection to REMOTE mongodb instance:" + config.db.mongodb);
        connect(config.db.mongodb);
    }

	mongoose.connection.on('error', function(err){
		console.log("Database connection error. Details:")
		console.log(err);
	});

    mongoose.connection.on('disconnected', function () {
        console.log("Database disconnected. Trying to reconnect.")
  		connect()
	});

    mongoose.connection.once('open', function callback () {
  		console.log("Database connection established.");
  	});
}






