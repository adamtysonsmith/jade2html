# jade2html
Compiles Jade templates into static HTML files.

##Recommended Workflow

1. Fork this repo
2. Edit the .gitignore to remove views/ and /public
3. Add your own views and public directories (These are the folders the script looks to compile assets and templates)
4. Develop your site using Jade templates and any data source you like, whether static JSON or MongoDB, etc
5. Write the routes and controllers as usual
6. To test during development, simply `node app` or `npm run dev`
7. To compile your final static website run `npm run compile`
8. The directory will be written to the root of this app

##Directions for Setting Up Your Compilation

1. Go to config.js
2. Inside the function, you can use the provided functions below to write your compile code
3. You can make directories, write parent pages, write the child pages that belong to the parents, etc
4. Making directories returns a promise before writing to it

| Function                | Params        |
|----------------------- |-------------------------------------|
|`Compile.makeDir`       |Name of directory to create            |
|`Compile.copyAssets`    |Directory to copy assets to            |
|`Compile.writeParent`   |Directory, template, name of html file |
|`Compile.writeChildren` |Directory, template                    |


###Here is an example of using these in action:

```
  Compile.makeDir('static_out')
    .then(function(directory){
      Compile.writeParent(directory, 'views/index.jade', 'index.html');
      Compile.writeChildren(directory, 'views/detail.jade');
    })
    .catch(function(err){
      console.log("Error compiling templates!", err);
    });

```
