var express = require('express');
var router = express.Router();

var pug = require('pug');
var path = require('path');

var Hotels = require('../lib/model/hotels');

const hotelKeys = [
  'biwako',
  'ito',
  'iwaya',
  'kamakura',
  'katsuura',
  'katsuyama',
  'kyoto',
  'kyukaruizawa',
  'madarao',
  'nakazawa',
  'nanki',
  'nasu',
  'tateshina',
  'toslove_luana',
  'toslove_viole',
  'toslove_wasorin',
  'toslove_yuzawa'
];

const partials = hotelKeys.reduce((map, key) => {
  map[key] = renderPartial(key);
  return map;
}, {});

function renderPartial(key) {
  return pug.renderFile(path.join(__dirname, '../views/partials/', key + '.pug'));
}

router.get('/', function(req, res, next) {
  Hotels.listNamesAndPaths((err, hotels) => {
    if (err) {
      return next(err);
    }
    res.render('hotels', {
      path: '/hotels',
      title: '施設一覧 | ITS健保（関東ITソフトウェア健康保険組合）施設検索',
      images: Hotels.listImages(),
      hotels: hotels
    });
  });
});

router.get('/:hotelKey', function(req, res, next) {
  let hotelKey = req.params.hotelKey;
  Hotels.getOne(hotelKey, (err, hotel) => {
    if (err) {
      return next(err);
    }
    Hotels.listNamesAndPaths((err2, hotels) => {
      if (err2) {
        return next(err2);
      }
      res.render('hotel', {
        path: '/hotels/' + hotelKey,
        title: hotel.name + ' | ITS健保（関東ITソフトウェア健康保険組合）施設検索',
        hotel: hotel,
        hotels: hotels,
        html: partials[hotelKey]
      });
    });
  });
});

module.exports = router;