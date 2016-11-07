'use strict';

var mongoose = require('../lib/config/db').mongoose;
var generateId = require('./plugins/generateId');

var resultSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  _author: {
    type: String,
    ref: 'User'
  },
  reminders: [{
    type: Date,
    day_freq: {
      type: String,
      enum: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
    },
    weeks: {
      type: Number,
      min: [1],
      max: [52]
    },
    months: {
      type: Number,
      min: [1],
      max: [12]
    },
    days: {
      type: Number,
      min: [1],
      max: [31]
    },
    time_freq: {
      hour: {
        type: Number,
        min: [0],
        max: [23]
      },
      minute: {
        type: Number,
        min: [0],
        max: [59]
      }
    },
    details: {
      type: String
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
  _users_r: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  _users_w: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  _notes: [{
    type: mongoose.Schema.ObjectId,
    Ref: 'Note'
  }]
});
//resultSchema.plugin(generateId());
module.exports = mongoose.model('Result', resultSchema);