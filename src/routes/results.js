var User = require('../models/users');
var Note = require('../models/notes');
var Result = require('../models/results');
var result = require('../controllers/resultsController');

module.exports = function(app) {
  app.post('/result', result.createResult);
  app.put('/result/:id', result.updateResult);
  app.get('/result', result.getResults);
  app.del('/result/:id', result.removeResult);
};
