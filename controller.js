var data = require('./data/data.js');

module.exports = {
    home: function(req, res, next) {
        res.render('index.jade', { data: data });
    },
    detail: function(req, res, next) {
        res.render('detail.jade', data[req.params.id])
    }
}