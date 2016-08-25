var express = require('express');
var router = express.Router();

var imagePaths = [
  '/images/toslove_viole.jpg',
  '/images/toslove_wasorin.jpg',
  '/images/toslove_luana.jpg',
  '/images/toslove_yuzawa.jpg',
  '/images/nakazawa.jpg',
  '/images/katsuura.jpg',
  '/images/biwako.jpg',
  '/images/nasu.jpg',
  '/images/ito.jpg',
  '/images/katsuyama.jpg',
  '/images/nanki.jpg',
  '/images/madarao.jpg',
  '/images/kyoto.jpg',
  '/images/tateshina.jpg',
  '/images/kyukaruizawa.jpg',
  '/images/kamakura.jpg',
  '/images/iwaya.jpg'
];

var imageUrls = [
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/toslove_viole/d-004.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/toslove_wasorin/d-017_01.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/toslove_luana/gaikan.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/toslove_yuzawa/d-043.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/nakazawa/d-057.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/katsuura/d-058.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/biwako/d-062.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/nasu.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/ito.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/katsuyama.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/nanki.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/madarao.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/kyoto.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/summer/tateshina.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/summer/kyukaruizawa.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/summer/kamakura.jpg',
  'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/iwaya.jpg'
];

router.get('/', function(req, res, next) {
  res.render('hotels', {
    path: '/hotels',
    title: '施設一覧 | ITS健保（関東ITソフトウェア健康保険組合）施設検索',
    images: imageUrls
  });
});

module.exports = router;