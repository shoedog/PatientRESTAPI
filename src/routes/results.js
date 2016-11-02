var User = require('../models/users');
var Note = require('../models/notes');
var Result = require('../models/results');


exports.createResult = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var Result = new Result();
  result.result = req.params.result;
  result.save( () => {
    res.send(req.body);
  });
};

exports.updateResult = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
};

exports.getResults = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
  Result.find().sort('date', -1).execFind(function (arr,data) {
    res.send(data);
  });
};

exports.removeResult = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
};