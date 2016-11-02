var User = require('../models/users');

exports.createUser = (req, res, next) => {
  let userModel = new User(req.body);
  userModel.save( (err, result) => {
      if (err) {
        console.log(err);
        return res.send({'error' :err});
      }
      return res.send({'result':result,'status':'success'});
  });
};

exports.getUser = (req, res, next) => {
  User.findById(new ObjectId(req.params.id), (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
      return res.send({'error' :err});
    }
    return res.send({'User':result});
  });
};

exports.updateUser = (req, res, next) => {
  var updatedUserModel = new User(req.body);
  User.findByIDAndUpdate(new ObjectId(req.params.id), updatedUserModel, (err, result) => {
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

exports.removeUser = (req, res, next) => {
  User.findByIdAndRemove(new ObjectId(req.params.id), (err, result) => {
    if (err) {
      console.log(err);
      return res.send({'error' :err});
    }
    return res.send({'status':'success'});
  });
};
