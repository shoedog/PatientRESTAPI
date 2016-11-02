var mongoose = require('mongoose');
var config = require('./config');

// Open Connection to mongo instance
mongoose.connect(config.dbPath);
var db = mongoose.connection;
db.on('error', () => {
  console.log('mongoose: mongodb connection error:');
});
db.once('open', () => {
  console.log('connected to db');
});

exports.mongoose = mongoose;