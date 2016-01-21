var express     = require('express');
var bodyParser  = require('body-parser');
var Controller  = require('./controller.js');
var Compile     = require('./compile.js');
var Q           = require('Q');

// Express Config
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', Controller.home);
app.get('/detail/:id', Controller.detail);

// Compile Jade Templates
if (process.argv[2] === 'compile') {
  console.log('Compiling Jade templates to static HTML..');
  
  Compile.makeDir('static_out')
    .then(function(directory){
      Compile.writeParent(directory, 'views/index.jade', 'index.html');
      Compile.writeChildren(directory, 'views/detail.jade');
    })
    .catch(function(err){
      console.log("Error compiling templates!", err);
    });
  
  console.log('Done!');
}
else {
  // Server
  var port = process.env.PORT || 3000;
  var server = app.listen(port, function() {
      console.log('Express server listening on port:', port);
  });
}
