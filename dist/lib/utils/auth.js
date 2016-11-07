'use strict';

//var Buffer = require('Buffer');
var jwt = require('jsonwebtoken');
var resHandlers = require('./reqResNextHandlers');

var SECRET = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');

exports.ensureAuth = function (req, res, next) {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        resHandlers.errorHandler(res, err);
      } else {
        req.decoded = decoded;
        //console.log(req.decoded);
        next();
      }
    });
  } else {
    resHandlers.resHandler(res.status(403), false, "No token provided");
  }
};

exports.createToken = function (user) {
  var tokenOpts = {
    algorithm: 'HS256',
    expiresIn: '24h'
  };

  return jwt.sign(user, SECRET, tokenOpts);
};