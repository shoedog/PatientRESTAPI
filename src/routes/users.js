var User = require('../models/users');
var Note = require('../models/notes');
var Result = require('../models/results');
var user = require('../controllers/userController');

module.exports = function(app) {
  app.post('/user', user.createUser);
  app.put('/user/:id', user.updateUser);
  app.get('/user/:id', user.getUser);
  app.del('/user/:id', user.removeUser);
};
