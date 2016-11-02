var Note = require('../models/notes');

exports.createNote = (req, res, next) => {
  let noteModel = new Note(req.body);
  noteModel.save( (err, result) => {
    if (err) {
      console.log(err);
      return res.send({'error' :err});
    }
    return res.send({'result':result,'status':'success'});
  });
};

//Update to get results only for that user
exports.getNotes = (req, res, next) => {
  Note.find().sort('date', -1).execFind(function (arr,data) {
    res.send(data);
  });
};

exports.updateNote = (req, res, next) => {
  var updatedNoteModel = new Note(req.body);
  Note.findByIDAndUpdate(new ObjectId(req.params.id), updatedNoteModel, (err, result) => {
    if (err) {
      console.log(err);
      return res.send({'error' :err});
    }
    if (result) {
      return res.send({'result':result,'status':'success'});
    } else {
      return res.send({'result':result,'status':'not found'});
    }

  });
};

exports.removeNote = (req, res, next) => {
  User.findByIdAndRemove(new ObjectId(req.params.id), (err, result) => {
    if (err) {
      console.log(err);
      return res.send({'error' :err});
    }
    return res.send({'status':'success'});
  });
};