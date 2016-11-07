var note = require('../controllers/notesController');
var auth = require('../lib/utils/auth');

module.exports = function(app) {
  app.post('/notes', auth.ensureAuth, note.createNote);
  app.post('/notes/addAccess/:id', auth.ensureAuth, note.addAccess);
  //app.post('/notes/addAccess/:id', auth.ensureAuth, note.removeAccess);
  app.put('/notes/:id', auth.ensureAuth, note.updateNote);
  app.get('/notes', auth.ensureAuth, note.getNotes);
  app.get('/notes/:id', auth.ensureAuth, note.getNote);
  app.del('/notes/:id', auth.ensureAuth, note.removeNote);
};


