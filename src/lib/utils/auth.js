//var Buffer = require('Buffer');
var jwt = require('jsonwebtoken');
var resHandlers = require('./reqResNextHandlers');

const SECRET = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');

exports.ensureAuth = (req, res, next) => {
  let token = ( req.headers['x-access-token']);
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
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

exports.createToken = (user) => {
  let tokenOpts = {
    algorithm: 'HS256',
    expiresIn: '2h'
  };

  return jwt.sign(user, SECRET, tokenOpts);
};