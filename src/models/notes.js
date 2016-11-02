var mongoose = require('../lib/db').mongoose;
var generateId = require('./plugins/generateId');

var noteSchema = new mongoose.Schema({
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
  author: {
    type: String,
    ref: 'User'
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