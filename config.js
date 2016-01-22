var Compile = require('./compile.js');
var data    = require('./data/data.js');

module.exports = function() {
  // Write compile code here
  Compile.makeDir('static_website')
    .then(function(directory){
      Compile.writeParent(directory, 'views/index.jade', data);
      Compile.writeChildren(directory, 'views/children.jade', data.children);
      Compile.copyPublicAssets(directory);
    })
    .catch(Compile.error)
    .done(Compile.done);
};