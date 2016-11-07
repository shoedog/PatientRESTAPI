'use strict';

var Note = require('../models/notes');
var resH = require('../lib/utils/reqResNextHandlers');
var db = require('../lib/utils/dbPromises');

exports.createNote = function (req, res, next) {
  var newNote = JSON.parse(req.body);
  newNote._author = req.decoded._doc._id;
  newNote._users_r = req.decoded._doc._id;
  newNote._users_w = req.decoded._doc._id;
  var noteModel = new Note(newNote);
  db.save(noteModel).then(function (note) {
    resH.resHandler(res, true, note);
  }).catch(function (err) {
    resH.errorHandler(res, err);
  });
};

exports.getNotes = function (req, res, next) {
  var id = req.decoded._doc._id;
  Note.find({ _author: id }).sort({ added_at: -1 }).populate('_author', 'name email').exec(function (err, data) {
    if (err) {
      resH.errorHandler(res, err);
    } else {
      if (data.length === 0) {
        resH.resHandler(res, false, "No Notes Found");
      } else {
        resH.resHandler(res, true, data);
      }
    }
  });
};

exports.getNote = function (req, res, next) {
  var authorId = req.decoded._doc._id;
  var docId = req.params.id;
  Note.find({ _author: authorId }).where('_id').equals(docId).populate('_author', 'name email').exec(function (err, data) {
    if (err) {
      resH.errorHandler(res, err);
    } else {
      if (data.length === 0) {
        resH.resHandler(res, false, "No Notes Found");
      } else {
        resH.resHandler(res, true, data);
      }
    }
  });
};

exports.addAccess = function (req, res, next) {
  var id = req.params.id;
  var uid = req.decoded._doc._id;
  db.findOne(Note, '_id', id, '_users_w').then(function (note) {
    if (note._users_w.toString().includes(uid)) {
      dbProm.findOne(User, 'email', req.body.email, 'email name password token').then(function (user) {
        if (user) {
          var _uid = user._id;
          console.log(req.body);
          if (req.body.access === 'write') {
            userAccess = {
              _users_w: _uid,
              _users_r: _uid
            };
            db.findIdAndUpdate(Note, id, userAccess).then(function (note) {
              if (note) {
                resH.resHandler(res, true, note);
              } else {
                resH.resHandler(res, false, "Note Not Found");
              }
            }).catch(function (err) {
              resH.errorHandler(res, err);
            });
          } else if (req.body.access === 'read') {
            db.findIdAndUpdate(Note, id, _user_r, user).then(function (note) {
              if (note) {
                resH.resHandler(res, true, note);
              } else {
                resH.resHandler(res, false, "Note Not Found");
              }
            }).catch(function (err) {
              resH.errorHandler(res, err);
            });
          } else {
            resH.resHandler(res, false, "You must specify read or write access in request: access: 'read' ");
          }
        } else {
          resH.resHandler(res, false, "User Not Found");
        }
      }).catch(function (err) {
        resH.errorHandler(res, err);
      });
    } else {
      resH.resHandler(res, false, "Not authorized to edit this note");
    }
  }).catch(function (err) {
    resH.errorHandler(res, err);
  });
};

exports.updateNote = function (req, res, next) {
  var id = req.params.id;
  var uid = req.decoded._doc._id;
  db.findOne(Note, '_id', id, '_users_w').then(function (note) {
    if (note._users_w.toString().includes(uid)) {
      db.findIdAndUpdate(Note, id, JSON.parse(req.body)).then(function (note) {
        if (note) {
          resH.resHandler(res, true, note);
        } else {
          resH.resHandler(res, false, "Note Not Found");
        }
      }).catch(function (err) {
        resH.errorHandler(res, err);
      });
    } else {
      resH.resHandler(res, false, "Not authorized to edit this note");
    }
  }).catch(function (err) {
    resH.errorHandler(res, err);
  });
};

exports.removeNote = function (req, res, next) {
  var id = req.params.id;
  var uid = req.decoded._doc._id;
  db.findOne(Note, '_id', id, '_users_w').then(function (note) {
    if (note._users_w.toString().includes(uid)) {
      db.findIdAndRemove(Note, id).then(function (note) {
        if (note) {
          resH.resHandler(res, true, "Note Deleted");
        } else {
          resH.resHandler(res, false, "Note Not Found");
        }
      }).catch(function (err) {
        resH.errorHandler(res, err);
      });
    } else {
      resH.resHandler(res, false, "Not authorized to delete this note");
    }
  }).catch(function (err) {
    resH.errorHandler(res, err);
  });
};