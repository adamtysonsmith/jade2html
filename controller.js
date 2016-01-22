var data = require('./data/data.js');
var getChildData = function(filename, collection) {
  var filtered = collection.filter(function(item) {
    return item.filename == filename;
  })
  
  if (filtered.length === 1) return filtered[0];
  else console.log("Error! Filename is not unique");
}

module.exports = {
  home: function(req, res, next) {
    res.render('index.jade', { data: data });
  },
  detail: function(req, res, next) {
    res.render('children.jade', getChildData(req.params.filename, data.children))
  }
}