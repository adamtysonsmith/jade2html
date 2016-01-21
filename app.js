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

if (process.argv[2] === 'compile') {
  // Compile Jade Templates
  console.log('Compiling Jade templates to static HTML..');
  Config();
  console.log('Done!');
} else {
  // Run Local Dev Server
  var port = process.env.PORT || 3000;
  var server = app.listen(port, function() {
      console.log('Express server listening on port:', port);
  });
}