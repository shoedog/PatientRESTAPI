var mongoose = require('mongoose');
var generateUID = require('./plugins/generateUID');

var userSchema = new mongoose.Schema({
  id: {
    type: String,
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
//userSchema.plugin(generateUID.generateUUID(userSchema));
module.exports = mongoose.model('User', userSchema);