var express     = require('express');
var bodyParser  = require('body-parser');
var Routes      = require('./routes.js');
var Compile     = require('./compile.js');
var Config      = require('./config.js');

// Express Config
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
Routes(app);

// Compile or Run Local Dev Server
if (process.argv[2] === 'compile') {
  console.log('Compiling Jade templates to static HTML..');
  Config();
} else {
  var port = process.env.PORT || 3000;
  var server = app.listen(port, function() {
      console.log('Express server listening on port:', port);
  });
}