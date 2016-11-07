'use strict';

var Result = require('../models/results');
var resH = require('../lib/utils/reqResNextHandlers');
var db = require('../lib/utils/dbPromises');

exports.createResult = function (req, res, next) {
  var newResult = JSON.parse(req.body);
  newResult._author = req.decoded._doc._id;
  newResult._users_r = req.decoded._doc._id;
  newResult._users_w = req.decoded._doc._id;
  var resultModel = new Result(newResult);
  db.save(resultModel).then(function (result) {
    resH.resHandler(res, true, result);
  }).catch(function (err) {
    resH.errorHandler(res, err);
  });
};

exports.getResults = function (req, res, next) {
  var id = req.decoded._doc._id;
  Result.find({ _author: id }).sort({ added_at: -1 }).populate('_author', 'name email').exec(function (err, data) {
    if (err) {
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

exports.getResult = function (req, res, next) {
  var authorId = req.decoded._doc._id;
  var docId = req.params.id;
  Result.find({ _author: authorId }).where('_id').equals(docId).populate('_author', 'name email').exec(function (err, data) {
    if (err) {
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

exports.updateResult = function (req, res, next) {
  var id = req.params.id;
  var uid = req.decoded._doc._id;
  db.findOne(Result, '_id', id, '_users_w').then(function (result) {
    if (result._users_w.toString().includes(uid)) {
      db.findIdAndUpdate(Result, id, JSON.parse(req.body)).then(function (result) {
        if (result) {
          resH.resHandler(res, true, result);
        } else {
          resH.resHandler(res, false, "Result Not Found");
        }
      }).catch(function (err) {
        resH.errorHandler(res, err);
      });
    } else {
      resH.resHandler(res, false, "Not authorized to edit this result");
    }
  }).catch(function (err) {
    resHandlers.errorHandler(res, err);
  });
};

exports.removeResult = function (req, res, next) {
  var id = req.params.id;
  var uid = req.decoded._doc._id;
  db.findOne(Result, '_id', id, '_users_w').then(function (result) {
    if (result._users_w.toString().includes(uid)) {
      db.findIdAndRemove(Result, id).then(function (result) {
        if (result) {
          resH.resHandler(res, true, "Result Deleted");
        } else {
          resH.resHandler(res, false, "Result Not Found");
        }
      }).catch(function (err) {
        resH.errorHandler(res, err);
      });
    } else {
      resH.resHandler(res, false, "Not authorized to delete this result");
    }
  }).catch(function (err) {
    resH.errorHandler(res, err);
  });
};