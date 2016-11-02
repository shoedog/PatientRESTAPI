var User = require('../models/users');
var Note = require('../models/notes');
var Result = require('../models/results');
var note = require('../controllers/notesController');

module.exports = function(app) {
  app.post('/note', note.createNote);
  app.put('/note/:id', note.updateNote);
  app.get('/note', note.getNotes);
  app.del('/note/:id', note.removeNote);
};


