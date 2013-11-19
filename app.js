
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , pass = require('./config/pass')
  , passport = require('passport')
  , http = require('http')
  , path = require('path')
    , user_routes = require('./routes/user');;

var app = express();
 

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

app.get('/', pass.ensureAuthenticated, routes.index);

app.get('/login', user_routes.login);
app.post('/login', user_routes.postLogin);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
