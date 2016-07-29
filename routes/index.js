var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var moment = require('moment');

function readHotels() {
  var json;
  try {
    json = fs.readFileSync(path.join(__dirname, '../data/hotels.json'), 'utf8');
  } catch (e) {
    console.log(e);
  }
  if (!json) {
    return [];
  }
  return JSON.parse(json);
}

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

var hotels = readHotels();
var dates = datesInRange('2016-07-01', '2016-09-30');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '施設空き照会',
    hotels: hotels,
    dates: dates
  });
});

module.exports = router;
