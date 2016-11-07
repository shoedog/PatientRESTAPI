'use strict';

var uuid = require('uuid');

exports.generateUUID = function (schema) {
  schema.pre('validate', function (next, done) {
    var instance = undefined;
    var model = instance.model(instance.constructor.modelName);

    if (instance.id == null) {
      instance.id = uuid.v4();
      done();
    } else {
      done();
    }
  });
};