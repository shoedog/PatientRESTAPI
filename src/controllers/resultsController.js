var Result = require('../models/results');

exports.createResult = (req, res, next) => {
  let resultModel = new Result(req.body);
  resultModel.save( (err, result) => {
    if (err) {
      console.log(err);
      return res.send({'error' :err});
    }
    return res.send({'result':result,'status':'success'});
  });
};

//Update to get results only for that user
exports.getResults = (req, res, next) => {
  Result.find().sort('date', -1).execFind(function (arr,data) {
    res.send(data);
  });
};

exports.updateResult = (req, res, next) => {
  var updatedResultModel = new Result(req.body);
  Result.findByIDAndUpdate(new ObjectId(req.params.id), updatedResultModel, (err, result) => {
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

exports.removeResult = (req, res, next) => {
  User.findByIdAndRemove(new ObjectId(req.params.id), (err, result) => {
    if (err) {
      console.log(err);
      return res.send({'error' :err});
    }
    return res.send({'status':'success'});
  });
};