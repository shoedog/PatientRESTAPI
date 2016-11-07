'use strict';

var User = require('../models/users');
var resHandlers = require('../lib/utils/reqResNextHandlers');
var auth = require('../lib/utils/auth');
var dbProm = require('../lib/utils/dbPromises');

exports.createUser = function (req, res, next) {
  dbProm.findOne(User, 'email', req.body.email).then(function (user) {
    if (user) {
      resHandlers.resHandler(res, false, "User Already Exists");
    } else {
      var userModel = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      dbProm.save(userModel).then(function (user) {
        var token = auth.createToken(user);
        dbProm.findIdAndUpdate(User, user._id, 'token', token).then(function (user) {
          resHandlers.resHandler(res, true, user, user.token);
        }).catch(function (err) {
          resHandlers.errorHandler(res, err);
        });
      }).catch(function (err) {
        resHandlers.errorHandler(res, err);
      });
    }
  }).catch(function (err) {
    resHandlers.errorHandler(res, err);
  });
};

exports.getUser = function (req, res, next) {
  dbProm.findOne(User, 'email', req.decoded._doc.email, 'email name password token').then(function (user) {
    if (user) {
      resHandlers.resHandler(res, true, user);
    } else {
      resHandlers.resHandler(res, false, "User Not Found");
    }
  }).catch(function (err) {
    resHandlers.errorHandler(res, err);
  });
};

exports.updateUser = function (req, res, next) {
  var id = req.decoded._doc._id;

  dbProm.findIdAndUpdate(User, id, JSON.parse(req.body)).then(function (user) {
    if (user) {
      resHandlers.resHandler(res, true, user);
    } else {
      resHandlers.resHandler(res, false, "User Not Found");
    }
  }).catch(function (err) {
    resHandlers.errorHandler(res, err);
  });
};

exports.removeUser = function (req, res, next) {
  var id = req.decoded._doc._id;
  dbProm.findIdAndRemove(User, id).then(function (user) {
    if (user) {
      resHandlers.resHandler(res, true, "User Account Deleted");
    } else {
      resHandlers.resHandler(res, false, "User Not Found");
    }
  }).catch(function (err) {
    resHandlers.errorHandler(res, err);
  });
};

exports.authUser = function (req, res, next) {
  dbProm.findOne(User, 'email', req.body.email).then(function (user) {
    if (user) {
      if (user.password != req.body.password) {
        resHandlers.resHandler(res, false, "Authentication failed. Incorrect password.");
      } else {
        var token = auth.createToken(user);
        dbProm.findIdAndUpdate(User, user._id, 'token', token).then(function (user) {
          resHandlers.resHandler(res, true, 'Auth Success', user.token);
        }).catch(function (err) {
          resHandlers.errorHandler(res, err);
        });
      }
    } else {
      resHandlers.resHandler(res, false, "Authentication failed. User not found.");
    }
  }).catch(function (err) {
    resHandlers.errorHandler(res, err);
  });
};