var express = require('express');
var router = express.Router();

var Hotels = require('../lib/model/hotels');

router.get('/', function(req, res, next) {
  Hotels.getData((err, hotels) => {
    if (err) {
      return next(err);
    }
    res.render('index', {
      path: '/',
      title: '空き状況カレンダー | ITS健保（関東ITソフトウェア健康保険組合）施設検索',
      hotels: hotels
    });
  });
});

module.exports = router;