var mongoose = require('mongoose');
var config = require('./config');

// Open Connection to mongo instance
mongoose.connect(config.dbPath);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', () => {
  console.log('mongoose: mongodb connection error:');
});
db.once('open', () => {
  console.log('connected to db');
});

exports.mongoose = mongoose;