var mongoose = require('../lib/config/db').mongoose;
var Schema = mongoose.Schema;

var noteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  text_content: [{
    type: String,
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
    _author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  }],
  images: [{
    data: Buffer,
    contentType: String,
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
    _author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  }],
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
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  _users_r: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  _users_w: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  _results: [{
    type: Schema.Types.ObjectId,
    Ref: 'Result'
  }]
});
module.exports = mongoose.model('Note', noteSchema);