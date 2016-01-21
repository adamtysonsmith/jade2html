var Controller  = require('./controller.js');

module.exports = function(app) {
  
  app.get('/', Controller.home);
  app.get('/detail/:id', Controller.detail);
  
}