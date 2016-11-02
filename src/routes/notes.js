var User = require('../models/users');
var Note = require('../models/notes');
var Result = require('../models/results');

exports.createNote = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var note = new Note();
  note.note = req.params.note;
  note.save( () => {
    res.send(req.body);
  });
};

exports.updateNote = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
};

exports.getNotes = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
  Note.find().sort('date', -1).execFind(function (arr,data) {
    res.send(data);
  });
};

exports.removeNote = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
};