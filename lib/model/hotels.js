'use strict';

let file = require('../file');

class Hotels {
  constructor(data) {
    this.data = data;
  }

  save() {
    file.writeToJson(this.data, 'hotels.json');
  }

  static get() {
    let data = [];
    try {
      data = file.readFromJson('hotels.json');
    } catch (e) {
      console.log(e);
    }

    return new Hotels(data);
  }
}

module.exports = Hotels;