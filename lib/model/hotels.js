'use strict';

let file = require('../file');

const NAMESPACE = 'hotels';

class Hotels {
  constructor(data) {
    this.data = data;
  }

  save() {
    file.write(NAMESPACE, this.data);
  }

  static get() {
    let data = [];
    try {
      data = file.read(NAMESPACE);
    } catch (e) {
      console.log(e);
    }

    return new Hotels(data);
  }
}

module.exports = Hotels;