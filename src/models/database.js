var mongoose = require('mongoose');
var uuid = require('uuid');

// Open Connection to mongo instance
mongoose.connect('mongodb://localhost/patientRestTest');

// handle Connection open
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose: mongodb connection error:'));
db.once('open', function() {

  // Build Schema
  var patientSchema = new mongoose.Schema({
    uid: String,
    name: String
  });

  var noteSchema = new mongoose.Schema({
    note: String,
    added_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });

  patientSchema.methods.addNote = function () {
    var note = this.name
      ? "Note from " + this.name
      : "No Note";
  };

  // Compile Schema to Model
  var Patient = mongoose.model('Patient', patientSchema);
  var Note = mongoose.model('Note', noteSchema);

  // Create Document
  var wesley = new Patient({ uuid: uuid.v4(), name: 'Wesley Jinks' });
  var note = new Note({ note: "First Note" });

  // Save to db
  wesley.save(function (err, wesley) {
    if (err) return console.err(err);
    wesley.addNote();
  });
  note.save(function (err) {
    if (err) return console.err(err);
    console.log(note);
  });

  // find all
  Patient.find(function (err, patients) {
    if (err) return console.err(err);
    console.log(patients);
  });

  // find one
  //Patient.find({ name: /^Wesley Jinks/}, callback);
});

