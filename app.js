
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , userModel = require('./models/user') // this need to be called before pass so that it can pickup the schema
  , pass = require('./config/pass')
  , passport = require('passport')
  , http = require('http')
  , path = require('path') 
  , db = require('./db/db')
  , user_routes = require('./routes/user')
  , api_user = require('./routes/api/api_user');

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
    var config = require('./config'); // TODO: need to put the mongodb local connection string here
}

// init the database connection
db.dbinit();

// setup UI routes
app.get('/', pass.ensureAuthenticated, routes.index);

app.get('/login', user_routes.GETlogin);
app.post('/login', user_routes.POSTlogin);

app.get('/register', user_routes.GETregister);
app.post('/register', user_routes.POSTregister);

app.get('/logout', user_routes.GETlogout);

// setup API routes
app.post('/api/v1/login', api_user.POSTlogin);
app.post('/api/v1/register', api_user.POSTregister);
app.get('/api/v1/logout', api_user.GETlogout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));  
});




