var morgan = require('morgan');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var jwt = require('express-jwt');

// Note: you need to specify one or more routes or paths that you want to protect,
// so that only users with the correct JWT will be able to do the request.
// app.use('/api/path-you-want-to-protect', jwtCheck);


// For local development, make sure a file named `.env` containing your AUTH0_CLIENT_SECRET,
// AUTH0_CLIENT_ID, and AUTH0_DOMAIN is in your project root directory (but don't commit it to git,
// it should be gitignored). Run your node server from your project root directory.

if (!process.env.NODE_ENV) {
  dotenv.load();
}

var jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use('/api/*', jwtCheck);
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
};
