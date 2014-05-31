var mongoose = require('mongoose');

// This is called from app.js to init the database
exports.dbinit = function(){
    var connect = function(connString){
        mongoose.connect(process.env.CUSTOMCONNSTR_MONGODB_URI,
            { server: { socketOptions: { keepAlive: 1 } } });
    }

    connect();

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






