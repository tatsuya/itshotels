var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('hotels', {
    path: '/hotels',
    title: '施設一覧 | ITS健保（関東ITソフトウェア健康保険組合）施設検索'
  });
});

module.exports = router;