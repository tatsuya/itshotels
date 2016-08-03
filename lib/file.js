'use strict';

let fs = require('fs');
let path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

exports.writeToJson = function(obj, filename) {
  let str;
  try {
    str = JSON.stringify(obj, null, 4);
  } catch (e) {
    throw new Error(`Failed to stringify object to JSON: ${obj}`);
  }

  let filepath = path.join(DATA_DIR, filename);
  console.log(`Writing data to ${filepath}`);
  fs.writeFileSync(filepath, str);
};

exports.readFromJson = function(filename) {
  let filepath = path.join(DATA_DIR, filename);
  console.log(`Reading data from ${filepath}`);
  let str = fs.readFileSync(filepath, 'utf8');

  try {
    return JSON.parse(str);
  } catch (e2) {
    throw new Error(`Failed to parse JSON: ${str}`);
  }
};