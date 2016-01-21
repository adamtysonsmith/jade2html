var Q    = require('q');
var fs   = require('fs-extra'); 
var jade = require('jade');
var data = require('./data.js');
//var mkdr = require('mkdirp');

// Make directory, returns promise
var makeDir = function(directory) {
  var deferred = Q.defer();
  fs.mkdirs(directory, function(err) {
    if (err) {
      console.log("Error making " + directory + " directory");
      deferred.reject(err);
    } else {
      console.log("Directory created successfully:", directory);
      deferred.resolve(directory);
    }
  });
  return deferred.promise;
}

// Write HTML files for each jade template
var writeParent = function(directory, filepath, filename) {
  fs.readFile(filepath, 'utf-8', function(error, source){
    var html = jade.render(source, {data: data});
    fs.writeFile(directory + '/' + filename, html, 'utf-8');
  });
}

var writeChildren = function(directory, filepath) {
  fs.readFile(filepath, 'utf-8', function(error, source){
    data.forEach(function(d){
      var html = jade.render(source, d);
      fs.writeFile(directory + '/' + d.filename, html, 'utf-8');
    });
  });
}

var copyAssets = function(directory) {
  
}

module.exports = {
  makeDir: makeDir,
  copyAssets: copyAssets,
  writeParent: writeParent,
  writeChildren: writeChildren
}

// Possible solutions to stuff
// https://github.com/jprichardson/node-fs-extra - Output to directories
// http://webapplog.com/jade/ - tutorial this code is based on

// Example website structure
// -----------------------------
// index.html
// about.html
// work.html
// contact.html
// clients.html
// work/
//   work-1.html
//   work-2.html
// clients/
//   client-1.html
//   client-2.html

// Data Management
// CSV > JSON > Compiled Jade



/*

    App Requirements
    - Develop locally with dynamic templating by running $npm dev
    - Compile the dynamic templates to HTML by running $npm compile
    @todo - Write script to fix hrefs
    @todo - What are the requirements for the data structure?
    @todo - copy everything in public and paste in output main directory
    
*/

// Concerns
// how do you distinguish main level from detail level pages?
// what if you had to build out a complex tree?

// Solution
// Use several composable functions to build a compilation ***
// could use config file.. (maybe consider it)

// Example
// Make x directory then compile these templates, then make y directory for these templates, then x, etc