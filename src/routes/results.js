var result = require('../controllers/resultsController');
var auth = require('../lib/utils/auth');

module.exports = function(app) {
  app.post('/results', auth.ensureAuth, result.createResult);
  app.put('/results/:id', auth.ensureAuth, result.updateResult);
  app.get('/results', auth.ensureAuth, result.getResults);
  app.get('/results/:id', auth.ensureAuth, result.getResult);
  app.del('/results/:id', auth.ensureAuth, result.removeResult);
};
