var restify = require('restify');

var app = express();
require('./parser')(app);
module.exports = app;