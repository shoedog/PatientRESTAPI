var Result = require('../models/results');
var resH = require('../lib/utils/reqResNextHandlers');
var db = require('../lib/utils/dbPromises');

exports.createResult = (req, res, next) => {
  let newResult = JSON.parse(req.body);
  newResult._author = req.decoded._doc._id;
  newResult._users_r = (req.decoded._doc._id);
  newResult._users_w = (req.decoded._doc._id);
  let resultModel = new Result(newResult);
  db.save(resultModel)
    .then( (result) => {
      resH.resHandler(res, true, result);
    })
    .catch( (err) => {
      resH.errorHandler(res, err);
    });
};

exports.getResults = (req, res, next) => {
  let id = req.decoded._doc._id;
  Result.find({ _author: id}).sort({ added_at: -1}).populate('_author', 'name email').exec( (err,data) => {
    if( err ) {
      resH.errorHandler(res, err);
    } else {
      if (data.length === 0) {
        resH.resHandler(res, false, "No Results Found");
      } else {
        resH.resHandler(res, true, data);
      }
    }
  });
};

exports.getResult = (req, res, next) => {
  let authorId = req.decoded._doc._id;
  let docId = req.params.id;
  Result.find({ _author: authorId}).where('_id').equals(docId).populate('_author', 'name email').exec( (err,data) => {
    if( err ) {
      resH.errorHandler(res, err);
    } else {
      if (data.length === 0) {
        resH.resHandler(res, false, "No Results Found");
      } else {
        resH.resHandler(res, true, data);
      }
    }
  });
};

exports.updateResult = (req, res, next) => {
  let id = req.params.id;
  let uid = req.decoded._doc._id;
  db.findOne(Result, '_id', id, '_users_w')
    .then( (result) => {
      if ( result._users_w.toString().includes(uid) ){
        db.findIdAndUpdate(Result, id, JSON.parse(req.body))
          .then( (result) => {
            if (result) {
              resH.resHandler(res, true, result);
            } else {
              resH.resHandler(res, false, "Result Not Found");
            }
          })
          .catch( (err) => {
            resH.errorHandler(res, err);
          });
      } else {
        resH.resHandler(res, false, "Not authorized to edit this result");
      }
    })
    .catch( (err) => {
      resHandlers.errorHandler(res, err);
    });
};

exports.removeResult = (req, res, next) => {
  let id = req.params.id;
  let uid = req.decoded._doc._id;
  db.findOne(Result, '_id', id, '_users_w')
    .then( (result) => {
      if ( result._users_w.toString().includes(uid) ){
        db.findIdAndRemove(Result, id)
          .then( (result) => {
            if (result) {
              resH.resHandler(res, true, "Result Deleted");
            } else {
              resH.resHandler(res, false, "Result Not Found");
            }
          })
          .catch( (err) => {
            resH.errorHandler(res, err);
          })
      } else {
        resH.resHandler(res, false, "Not authorized to delete this result");
      }
    })
    .catch( (err) => {
      resH.errorHandler(res, err);
    });
};