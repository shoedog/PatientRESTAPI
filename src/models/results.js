var mongoose = require('mongoose');
var generateId = require('./plugins/generateId');

var resultSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  added_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
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
  notes: [{
    type: mongoose.Schema.ObjectId,
    Ref: 'Note'
  }]
});
resultSchema.plugin(generateId());
module.exports = mongoose.model('Result', resultSchema);