'use strict';

let _ = require('lodash');
let repo = require('../repository');

const NAMESPACE = 'hotels';

const metadata = require('../../data/hotel-metadata');

class Hotels {
  constructor(data) {
    this.data = data.map(function(hotel) {
      return _.merge(hotel, Hotels.findMetadataByName(hotel.name));
    });
  }

  save(callback) {
    repo.write(NAMESPACE, this.data, callback);
  }

  static get(callback) {
    repo.read(NAMESPACE, function(err, data) {
      if (err) {
        // TODO: Propagate error to upstream.
        console.log(err);
        return callback(null, new Hotels([]));
      }
      if (!data) {
        return callback(null, new Hotels([]));
      }
      return callback(null, new Hotels(data));
    });
  }

  static getOne(key, callback) {
    Hotels.get(function(err, hotels) {
      if (err) {
        return callback(err);
      }
      let found = hotels.data.find(function(hotel) {
        return hotel.key === key;
      });
      if (!found) {
        return callback(new Error('hotel not found: ' + key));
      }
      return callback(null, found);
    })
  }

  static getData(callback) {
    Hotels.get((err, hotels) => {
      if (err) {
        return callback(err);
      }
      return callback(null, hotels.data);
    });
  }

  static findMetadataByName(name) {
    let foundKey = Object.keys(metadata).find(function(key) {
      let hotel = metadata[key];
      return hotel.name === name;
    });
    if (!foundKey) {
      return null;
    }
    let hotelMetadata = _.cloneDeep(metadata[foundKey]);
    hotelMetadata.key = foundKey;
    hotelMetadata.path = '/hotels/' + foundKey;
    return hotelMetadata;
  }
}

module.exports = Hotels;