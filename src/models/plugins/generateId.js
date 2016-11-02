module.exports = () => {
  return generateId = (schema) => {
    schema.pre('validate', (next, done) => {
      var instance = this;
      var model = instance.model(instance.constructor.modelName);

      if( instance.id == null ) {
        model.findOne().sort("-id").exec( (err, maxInstance) => {
          if (err) {
            return done(err);
          } else {
            var maxId = maxInstance.id || 0;
            instance.id = maxId+1;
            done();
          }
        })
      } else {
        done();
      }
    })
  }
};