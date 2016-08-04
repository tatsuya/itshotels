var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: '施設空き照会'
  });
});

module.exports = router;