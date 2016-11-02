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
  notes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Note'
  }],
  results: [{
    type: mongoose.Schema.ObjectId,
    Ref: 'Result'
  }]
});
userSchema.plugin(generateUID());
module.exports = mongoose.model('User', userSchema);