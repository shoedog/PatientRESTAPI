var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var morgan = require('morgan');
var errorHandler = require('errorhandler');

//var routes = require('./routes');

var PORT = 3000;
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({ extended: false });
var router = express.Router();

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
});