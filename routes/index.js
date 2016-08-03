var express = require('express');
var router = express.Router();

var Hotels = require('../lib/model/hotels');

var moment = require('moment');

function datesInRange(startStr, endStr) {
  var start = new Date(startStr);
  var end = new Date(endStr);
  var dates = [];
  if (start <= end) {
    for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
      var newDate = moment(new Date(d));
      dates.push({
        date: newDate.format('YYYY-MM-DD'),
        displayDate: newDate.format('YYYY-MM-DD (ddd)')
      });
    }
  }
  return dates;
}

var hotels = Hotels.get();
var dates = datesInRange('2016-07-01', '2016-09-30');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '施設空き照会',
    hotels: hotels.data,
    dates: dates
  });
});

module.exports = router;
