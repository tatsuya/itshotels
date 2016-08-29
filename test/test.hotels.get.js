'use strict';

let Hotels = require('../lib/model/hotels');

Hotels.get(function(err, hotels) {
  if (err) {
    throw err;
  }
  console.log(hotels.data);
});
