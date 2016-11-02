var User = require('../models/users');
var Note = require('../models/notes');
var Result = require('../models/results');


exports.createUser = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var user = new User();
  user.user = req.params.user;
  user.save( () => {
    res.send(req.body);
  });
};

exports.updateUser = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
};

exports.getUser = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
};

exports.removeUser = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
};