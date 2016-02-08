var Q    = require('q');
var fs   = require('fs-extra'); 
var jade = require('jade');

// Make directory, returns promise
var makeDir = function(directory) {
  var deferred = Q.defer();
  fs.mkdirs(directory, function(err) {
    if (err) {
      console.log("Error making " + directory + " directory");
      deferred.reject(err);
    } else {
      deferred.resolve(directory);
    }
  });
  return deferred.promise;
}

// Write HTML files for each jade template
var writeParent = function(directory, filepath, data) {
  fs.readFile(filepath, 'utf-8', function(error, source){
    var html = jade.render(source, { data: data });
    fs.writeFile(directory + '/' + data.filename, html, 'utf-8');
  });
}

var writeChildren = function(directory, filepath, data) {
  fs.readFile(filepath, 'utf-8', function(error, source){
    data.forEach(function(d){
      var html = jade.render(source, d);
      fs.writeFile(directory + '/' + d.filename, html, 'utf-8');
    });
  });
}

var copyPublicAssets = function(directory) {
  try { fs.copySync('./public', directory) }
  catch (err) { console.log('Error! Could not copy public assets', err.message) }
}

var compileError = function(err) {
  console.log("Error compiling templates!", err);
}

var compileDone = function() {
  console.log("Finished compiling templates!");
}

module.exports = {
  makeDir: makeDir,
  copyPublicAssets: copyPublicAssets,
  writeParent: writeParent,
  writeChildren: writeChildren,
  error: compileError,
  done: compileDone
}
// Example
// Make x directory then compile these templates, then make y directory for these templates, then x, etc
