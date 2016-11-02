var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var morgan = require('morgan');
var errorHandler = require('errorhandler');
var restify = require('restify');
var fs = require('fs');

var config = require('./lib/config');
var defaultRoute = require('./routes/routes');

var PORT = 3000;
//var jsonParser = bodyParser.json();
//var urlParser = bodyParser.urlencoded({ extended: false });
/*var router = express.Router();

var app = express();
if (process.env.NODE_ENV == 'development') {
  app.use(errorHandler());
}
app.set('port', process.env.PORT || PORT);
app.use(morgan('dev'));
app.use(bodyParser);
app.use(router);

http.createServer(app).listen(app.get('port'), function() {
  console.log(`Express server listening on port ${app.get('port')}`);
});*/

const serverOpts = {
  name: 'PatientTracker',
};

var server = restify.createServer(serverOpts);

//server.use() before routes
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.bodyParser({
  mapParams: true,
  overrideParams: false,
}));

// Routes

/*
server.post('/user', userRoutes.createUser);
server.put('/user/:id', userRoutes.updateUser);
server.get('/user/:id', userRoutes.getUser);
server.del('/user/:id', userRoutes.removeUser);


server.post('/result', resultRoutes.createResult);
server.put('/result/:id', resultRoutes.updateResult);
server.get('/result', resultRoutes.getResults);
server.del('/result/:id', resultRoutes.removeResult);

server.post('/note', noteRoutes.createNote);
server.put('/note/:id', noteRoutes.updateNote);
server.get('/note', noteRoutes.getNotes);
server.del('/note/:id', noteRoutes.removeNote);
*/
server.get('/', defaultRoute);

server.listen(config.port, () => {
  console.log(`${server.name} listening at ${server.url}`)
});

var userRoutes = require('./routes/users')(server);
var noteRoutes = require('./routes/notes')(server);
var resultRoutes = require('./routes/results')(server);