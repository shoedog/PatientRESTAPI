exports.save = function(model){
  return new Promise( (resolve, reject) => {
    model.save( (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.findIdAndUpdate = function(Model, id, prop, fieldVal) {
  if( typeof prop === 'string') {
    console.log('string update');
    return new Promise( (resolve, reject) => {
      Model.findByIdAndUpdate(id,
        { $set: { [prop]: fieldVal }}, { new: true }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  } else if ( typeof prop === 'object' ) {
    return new Promise( (resolve, reject) => {
      Model.findByIdAndUpdate(id,
        { $set: prop }, { new: true }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  }
};

exports.findOne = function(Model, prop, fieldVal, selects) {
  return new Promise( (resolve, reject) => {
    Model.findOne({ [prop]: fieldVal }, selects, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
};

exports.findIdAndRemove = function(Model, id) {
  return new Promise( (resolve, reject) => {
    Model.findByIdAndRemove(id, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve (user);
      }
    })
  })
};