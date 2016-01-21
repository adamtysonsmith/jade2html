# jade2html
Compiles Jade templates into static HTML files.

##Recommended Workflow

1. Add your own views and public assets (Some views, assets and data are included for an example)
2. Develop your site using Jade templates and any data source you like, whether static JSON or MongoDB, etc
3. Write the routes and controllers as usual (Examples are included)
4. To test during development, simply `node app` or `npm run dev`
5. To compile your final static website run `npm run compile`
6. The directory will be written to the root of this app

##Directions for Setting Up Your Compilation

1. Go to config.js
2. Inside the function, you can use the provided functions below to write your compile code
3. You can make directories, write parent pages, write the child pages that belong to the parents, etc
4. Making directories returns a promise before writing to it

| Function                | Params        |
|----------------------- |-------------------------------------|
|`Compile.makeDir`       |Name of directory to create            |
|`Compile.copyAssets`    |Directory to copy public assets to            |
|`Compile.writeParent`   |Directory, template, name of html file |
|`Compile.writeChildren` |Directory, template                    |


###Here is an example of using the config.js in action:

```
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

```
