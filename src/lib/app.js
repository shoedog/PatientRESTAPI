var express = require('express');

var app = express();
require('./parser')(app);
module.exports = app;