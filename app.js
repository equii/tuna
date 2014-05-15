
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , userModel = require('./models/user')
  , pass = require('./config/pass')
  , passport = require('passport')
  , http = require('http')
  , path = require('path') 
  , db = require('./db/db')
  , user_routes = require('./routes/user');

var app  = express();

module.exports = app;


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// open a connection to the db
db.dbinit();

//setup routes
app.get('/', pass.ensureAuthenticated, routes.index);
app.get('/login', user_routes.login);
app.get('/create', user_routes.create);
app.post('/login', user_routes.postLogin);
app.post('/create', user_routes.postCreate);
app.get('/logout', user_routes.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));  
});




