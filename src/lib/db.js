var mongoose = require('mongoose');
module.exports = function (app) {
  // Open Connection to mongo instance
  mongoose.connect('mongodb://localhost/patientRestTest',
    {
      mongoose: { safe: true }
    }, function (err) {
      if (err) {
        return console.log('mongoose: mongodb connection error:');
      }
    });
  return mongoose;
};