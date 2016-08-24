var express = require('express');
var router = express.Router();

var Hotels = require('../../lib/model/hotels');

router.get('/', function(req, res, next) {
    Hotels.get(function(err, hotels) {
    if (err) {
      return next(err);
    }
    res.json(hotels.data);
  });
});

module.exports = router;