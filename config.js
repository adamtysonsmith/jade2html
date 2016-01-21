var Compile = require('./compile.js');

module.exports = function() {
  
  // Write compile code here
    Compile.makeDir('static_out')
    .then(function(directory){
      Compile.writeParent(directory, 'views/index.jade', 'index.html');
      Compile.writeChildren(directory, 'views/detail.jade');
    })
    .catch(function(err){
      console.log("Error compiling templates!", err);
    });
  
};