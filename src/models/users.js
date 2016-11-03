var mongoose = require('../lib/config/db').mongoose;
var generateUUID = require('./plugins/generateUUID');
var uuid = require('uuid');

var userSchema = new mongoose.Schema({
  /*id: {
    type: String,
    default: uuid.v4()
  },*/
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  }
});
var collectionName = 'User';
var User = mongoose.model(collectionName, userSchema);
module.exports = User;