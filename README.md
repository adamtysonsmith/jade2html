#jade2html
##Warning: Work in Progress
Compiles Jade templates into static HTML files.

##Recommended Workflow

1. Add your own views and public assets (Some views, assets and data are included for an example)
2. Develop your site using Jade templates and any data store you like, whether static JSON or MongoDB, etc
3. Write the routes and controllers as usual (Examples are included)
4. To test during development, simply `node app` or `npm start`
5. To compile your final static website run `npm run compile`
6. The directory will be written to the root of this app

##Data Requirements

Each data object or document must include a `filename` property (String).  That's it!  Filenames should end in `.html` and must be unique for each piece of data that you render in your templates.  This could be JSON, MongoDB document, or even plain JS object - the world is your oyster.

```
{
  property_1: yada,
  property_2: yada, 
  property_3: yada,
  filename: 'yada.html'
}
```

##Directions for Setting Up Your Compilation

1. Go to config.js
2. Inside the function, you can use the provided functions below to write your compile code
3. You can make directories, write parent pages, write the child pages that belong to the parents, etc
4. Making directories returns a promise before writing to it

| Function                     | Params                                |
|-----------------------       |-------------------------------------- |
|`Compile.makeDir`             |Name of directory to create            |
|`Compile.copyPublicAssets`    |Directory to copy public assets to     |
|`Compile.writeParent`         |Directory, template, data (Object)     |
|`Compile.writeChildren`       |Directory, template, data (Array of Objects)|


###Here is an example of using the config.js in action:

```
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

```
