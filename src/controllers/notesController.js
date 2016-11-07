var Note = require('../models/notes');
var resH = require('../lib/utils/reqResNextHandlers');
var db = require('../lib/utils/dbPromises');

exports.createNote = (req, res, next) => {
  let newNote = JSON.parse(req.body);
  newNote._author = req.decoded._doc._id;
  newNote._users_r = (req.decoded._doc._id);
  newNote._users_w = (req.decoded._doc._id);
  let noteModel = new Note(newNote);
  db.save(noteModel)
    .then( (note) => {
      resH.resHandler(res, true, note);
    })
    .catch( (err) => {
      resH.errorHandler(res, err);
    });
};

exports.getNotes = (req, res, next) => {
  let id = req.decoded._doc._id;
  Note.find({ _author: id}).sort({ added_at: -1}).populate('_author', 'name email').exec( (err,data) => {
    if( err ) {
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

exports.getNote = (req, res, next) => {
  let authorId = req.decoded._doc._id;
  let docId = req.params.id;
  Note.find({ _author: authorId}).where('_id').equals(docId).populate('_author', 'name email').exec( (err,data) => {
    if( err ) {
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

exports.addAccess = (req, res, next) => {
  let id = req.params.id;
  let uid = req.decoded._doc._id;
  db.findOne(Note, '_id', id, '_users_w')
    .then( (note) => {
      if ( note._users_w.toString().includes(uid) ){
        dbProm.findOne(User, 'email', req.body.email, 'email name password token')
          .then( (user) => {
            if( user) {
              let uid = user._id;
              console.log(req.body);
              if( req.body.access === 'write' ){
                userAccess = {
                  _users_w: uid,
                  _users_r: uid,
                };
                db.findIdAndUpdate(Note, id, userAccess)
                  .then( (note) => {
                    if (note) {
                      resH.resHandler(res, true, note);
                    } else {
                      resH.resHandler(res, false, "Note Not Found");
                    }
                  })
                  .catch( (err) => {
                    resH.errorHandler(res, err);
                  });
              } else if ( req.body.access === 'read' ) {
                db.findIdAndUpdate(Note, id, _user_r, user)
                  .then( (note) => {
                    if (note) {
                      resH.resHandler(res, true, note);
                    } else {
                      resH.resHandler(res, false, "Note Not Found");
                    }
                  })
                  .catch( (err) => {
                    resH.errorHandler(res, err);
                  });
              } else {
                resH.resHandler(res, false, "You must specify read or write access in request: access: 'read' ");
              }
            } else {
              resH.resHandler(res, false, "User Not Found");
            }
          })
          .catch( (err) => {
            resH.errorHandler(res, err);
          });
      } else {
        resH.resHandler(res, false, "Not authorized to edit this note");
      }
    })
    .catch( (err) => {
      resH.errorHandler(res, err);
    });
};

exports.updateNote = (req, res, next) => {
  let id = req.params.id;
  let uid = req.decoded._doc._id;
  db.findOne(Note, '_id', id, '_users_w')
    .then( (note) => {
      if ( note._users_w.toString().includes(uid) ){
        db.findIdAndUpdate(Note, id, JSON.parse(req.body))
          .then( (note) => {
            if (note) {
              resH.resHandler(res, true, note);
            } else {
              resH.resHandler(res, false, "Note Not Found");
            }
          })
          .catch( (err) => {
            resH.errorHandler(res, err);
          });
      } else {
        resH.resHandler(res, false, "Not authorized to edit this note");
      }
    })
    .catch( (err) => {
      resH.errorHandler(res, err);
    });
};

exports.removeNote = (req, res, next) => {
  let id = req.params.id;
  let uid = req.decoded._doc._id;
  db.findOne(Note, '_id', id, '_users_w')
    .then( (note) => {
      if ( note._users_w.toString().includes(uid) ){
        db.findIdAndRemove(Note, id)
          .then( (note) => {
            if (note) {
              resH.resHandler(res, true, "Note Deleted");
            } else {
              resH.resHandler(res, false, "Note Not Found");
            }
          })
          .catch( (err) => {
            resH.errorHandler(res, err);
          })
      } else {
        resH.resHandler(res, false, "Not authorized to delete this note");
      }
    })
    .catch( (err) => {
      resH.errorHandler(res, err);
    });
};