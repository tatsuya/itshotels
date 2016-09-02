var express = require('express');
var router = express.Router();

var Hotels = require('../lib/model/hotels');

router.get('/', function(req, res, next) {
  let metadata = Hotels.listMetadata();
  let images = Object.keys(metadata).map(function(key) {
    return metadata[key].image;
  });
  res.render('hotels', {
    path: '/hotels',
    title: '施設一覧 | ITS健保（関東ITソフトウェア健康保険組合）施設検索',
    images: images
  });
});

router.get('/:hotelName', function(req, res, next) {
  let hotel = Hotels.getMetadata(req.params.hotelName);
  res.render('hotel', {
    path: '/hotels',
    title: hotel.name + ' | ITS健保（関東ITソフトウェア健康保険組合）施設検索',
    hotel: hotel
  });
});

module.exports = router;