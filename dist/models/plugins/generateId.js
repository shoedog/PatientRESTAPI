"use strict";

module.exports = function () {
  return function generateId(schema) {
    var _this = this;

    schema.pre('validate', function (next, done) {
      var instance = _this;
      var model = instance.model(instance.constructor.modelName);

      if (instance.id == null) {
        model.findOne().sort("-id").exec(function (err, maxInstance) {
          if (err) {
            return done(err);
          } else {
            var maxId = maxInstance.id || 0;
            instance.id = maxId + 1;
            done();
          }
        });
      } else {
        done();
      }
    });
  };
};