var result = require('../controllers/resultsController');
var auth = require('../lib/utils/auth');

module.exports = function(app) {
  app.post('/result', auth.ensureAuth, result.createResult);
  app.put('/result/:id', auth.ensureAuth, result.updateResult);
  app.get('/result', auth.ensureAuth, result.getResults);
  app.get('/result/:id', auth.ensureAuth, result.getResult);
  app.del('/result/:id', auth.ensureAuth, result.removeResult);
};
