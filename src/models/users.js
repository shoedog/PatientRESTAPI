var mongoose = require('../lib/db').mongoose;
var generateUUID = require('./plugins/generateUUID');

var userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    index: {
      unique: true
    }
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
var collectionName = 'User';
userSchema.plugin(generateUUID());
module.exports = mongoose.model(collectionName, userSchema);