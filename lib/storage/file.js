'use strict';

let fs = require('fs');
let path = require('path');

let json = require('../json');

const DATA_DIR = path.join(__dirname, '../../data');

exports.write = function(namespace, obj, callback) {
  let str;
  try {
    str = json.stringify(obj);
  } catch (e) {
    return callback(e);
  }
  let filepath = path.join(DATA_DIR, `${namespace}.json`);
  console.log(`Writing data to ${filepath}`);
  fs.writeFile(filepath, str, callback);
};

exports.read = function(namespace, callback) {
  let filepath = path.join(DATA_DIR, `${namespace}.json`);
  console.log(`Reading data from ${filepath}`);
  fs.readFile(filepath, 'utf8', function(err, str) {
    if (err) {
      return callback(err);
    }
    let obj;
    try {
      obj = json.parse(str);
    } catch (e) {
      return callback(e);
    }
    return callback(null, obj);
  });
};
