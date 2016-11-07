'use strict';

var mongoose = require('mongoose');
var config = require('./config');

// Open Connection to mongo instance
mongoose.connect(config.dbPath);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', function () {
  console.log('mongoose: mongodb connection error:');
});
db.once('open', function () {
  console.log('connected to db');
});

exports.mongoose = mongoose;