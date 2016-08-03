'use strict';

let Hotels = require('../lib/model/hotels');

let hotels = Hotels.get();
console.log(hotels.data);
