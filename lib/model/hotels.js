'use strict';

let file = require('../file');

const NAME_SPACE = 'hotels';

class Hotels {
  constructor(data) {
    this.data = data;
  }

  save() {
    file.write(NAME_SPACE, this.data);
  }

  static get() {
    let data = [];
    try {
      data = file.read(NAME_SPACE);
    } catch (e) {
      console.log(e);
    }

    return new Hotels(data);
  }
}

module.exports = Hotels;