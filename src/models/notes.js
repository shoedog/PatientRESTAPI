var mongoose = require('mongoose');
var generateId = require('./plugins/generateId');

var noteSchema = new mongoose.Schema({
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
  added_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  users: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  results: [{
    type: mongoose.Schema.ObjectId,
    Ref: 'Result'
  }]
});
noteSchema.plugin(generateId());
module.exports = mongoose.model('Note', noteSchema);