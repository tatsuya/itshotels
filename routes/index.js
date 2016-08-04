var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'ITS健保（関東ITソフトウェア健康保険組合）の施設空き状況カレンダー'
  });
});

module.exports = router;