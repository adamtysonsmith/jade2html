var theD = require('./data.js');

module.exports = {
    home: function(req, res, next) {
        res.render('index.jade', { data: theD });
    },
    detail: function(req, res, next) {
        res.render('detail.jade', theD[req.params.id])
    }
}