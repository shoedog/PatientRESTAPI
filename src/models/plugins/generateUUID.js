var uuid = require('uuid');

module.exports = function() {
  return function generateUUID(schema) {
    schema.pre('validate', (next, done) => {
      var instance = this;
      var model = instance.model(instance.constructor.modelName);

      if( instance.id == null ) {
        while(true){
          let id = uuid.v4();
          if ( !addId(model, id)){
            break;
          }
        }
        instance.id = id;
        done();
      } else {
        done();
      }
    })
  }
};

function addId(model, id) {
  model.findById(new ObjectID(id), (err, user) => {
    if (err) {
      return done(err);
    }
    return user;
  });
}