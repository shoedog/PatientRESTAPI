var uuid = require('uuid');

exports.generateUUID = (schema) => {
    schema.pre('validate', (next, done) => {
      var instance = this;
      var model = instance.model(instance.constructor.modelName);

      if( instance.id == null ) {
        instance.id = uuid.v4();
        done();
      } else {
        done();
      }
    })
};