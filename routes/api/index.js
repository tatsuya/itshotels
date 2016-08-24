let express = require('express');
let router = express.Router();

let hotels = require('./hotels');
let prefectures = require('./prefectures');

router.use('/hotels', hotels);
router.use('/prefectures', prefectures);

module.exports = router;