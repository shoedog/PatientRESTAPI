var User = require('../models/users');
var Note = require('../models/notes');
var Result = require('../models/results');
var user = require('../controllers/userController');
var auth = require('../lib/utils/auth');

module.exports = function(app) {
  app.post('/user', user.createUser);
  app.post('/user/auth', user.authUser);
  app.put('/user', auth.ensureAuth, user.updateUser);
  app.get('/user', auth.ensureAuth, user.getUser);
  app.del('/user', auth.ensureAuth, user.removeUser);
};
