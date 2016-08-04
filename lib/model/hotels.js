'use strict';

let repo = require('../repository');

const NAMESPACE = 'hotels';

class Hotels {
  constructor(data) {
    this.data = data;
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
}

module.exports = Hotels;