'use strict';

var uuid = require('uuid');

module.exports = function () {
  return function generateUUID(schema) {
    var _this = this;

    schema.pre('validate', function (next, done) {
      var instance = _this;
      var model = instance.model(instance.constructor.modelName);

      if (instance.id == null) {
        while (true) {
          var _id = uuid.v4();
          if (!addId(model, _id)) {
            break;
          }
        }
        instance.id = id;
        done();
      } else {
        done();
      }
    });
  };
};

function addId(model, id) {
  model.findById(new ObjectID(id), function (err, user) {
    if (err) {
      return done(err);
    }
    return user;
  });
}