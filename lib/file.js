'use strict';

let fs = require('fs');
let path = require('path');

let json = require('./json');

const DATA_DIR = path.join(__dirname, '../data');

exports.write = function(namespace, obj) {
  let str = json.stringify(obj);
  let filepath = path.join(DATA_DIR, `${namespace}.json`);
  console.log(`Writing data to ${filepath}`);
  fs.writeFileSync(filepath, str);
};

exports.read = function(namespace) {
  let filepath = path.join(DATA_DIR, `${namespace}.json`);
  console.log(`Reading data from ${filepath}`);
  let str = fs.readFileSync(filepath, 'utf8');
  return json.parse(str);
};
