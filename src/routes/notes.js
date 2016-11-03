var note = require('../controllers/notesController');
var auth = require('../lib/utils/auth');

module.exports = function(app) {
  app.post('/note', auth.ensureAuth, note.createNote);
  app.put('/note/:id', auth.ensureAuth, note.updateNote);
  app.get('/note', auth.ensureAuth, note.getNotes);
  app.get('/note/:id', auth.ensureAuth, note.getNote);
  app.del('/note/:id', auth.ensureAuth, note.removeNote);
};


