var User = require('../models/users');
var resHandlers = require('../lib/utils/reqResNextHandlers');
var auth = require('../lib/utils/auth');
var dbProm = require('../lib/utils/dbPromises');


exports.createUser = (req, res, next) => {
  dbProm.findOne(User, 'email', req.body.email)
    .then( (user) => {
      if (user) {
        resHandlers.resHandler(res, false, "User Already Exists");
      } else {
        const userModel = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        dbProm.save(userModel)
          .then( (user) => {
            let token = auth.createToken(user);
            dbProm.findIdAndUpdate(User, user._id, 'token', token)
              .then( (user) => {
                resHandlers.resHandler(res, true, user, user.token);
              })
              .catch( (err) => {
                resHandlers.errorHandler(res, err);
              })
          })
          .catch( (err) => {
            resHandlers.errorHandler(res, err);
          })
      }
    })
    .catch( (err) => {
      resHandlers.errorHandler(res, err);
    })
};

exports.getUser = (req, res, next) => {
  dbProm.findOne(User, 'email', req.decoded._doc.email, 'email name password token')
    .then( (user) => {
      if (user) {
        resHandlers.resHandler(res, true, user);
      } else {
        resHandlers.resHandler(res, false, "User Not Found");
      }
    })
    .catch( (err) => {
      resHandlers.errorHandler(res, err);
    });
};

exports.updateUser = (req, res, next) => {
  let id = req.decoded._doc._id;

  dbProm.findIdAndUpdate(User, id, JSON.parse(req.body))
    .then( (user) => {
      if (user) {
        resHandlers.resHandler(res, true, user);
      } else {
        resHandlers.resHandler(res, false, "User Not Found");
      }
    })
    .catch( (err) => {
      resHandlers.errorHandler(res, err);
    });
};

exports.removeUser = (req, res, next) => {
  let id = req.decoded._doc._id;
  dbProm.findIdAndRemove(User, id)
    .then( (user) => {
      if (user) {
        resHandlers.resHandler(res, true, "User Account Deleted");
      } else {
        resHandlers.resHandler(res, false, "User Not Found");
      }
    })
    .catch( (err) => {
      resHandlers.errorHandler(res, err);
    })
};

exports.authUser = (req, res, next) => {
  dbProm.findOne(User, 'email', req.body.email)
    .then( (user) => {
      if (user) {
        if (user.password != req.body.password) {
          resHandlers.resHandler(res, false, "Authentication failed. Incorrect password.");
        } else {
          let token = auth.createToken(user);
          dbProm.findIdAndUpdate(User, user._id, 'token', token)
            .then( (user) => {
              resHandlers.resHandler(res, true, `Auth Success`, user.token);
            })
            .catch( (err) => {
              resHandlers.errorHandler(res, err);
            })
        }
      } else {
        resHandlers.resHandler(res, false, "Authentication failed. User not found.");
      }
    })
    .catch( (err) => {
      resHandlers.errorHandler(res, err);
    })
};

