let url = require('url');
let redis = require('redis');

let client;
if (process.env.REDISTOGO_URL) {
  let rtg = url.parse(process.env.REDISTOGO_URL);
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
} else {
  client = redis.createClient();
}

let json = require('../json');

exports.write = function(namespace, obj, callback) {
  let str;
  try {
    str = json.stringify(obj);
  } catch (e) {
    return callback(e);
  }

  client.set(namespace, str, callback);
};

exports.read = function(namespace, callback) {
  client.get(namespace, function(err, data) {
    if (err) {
      return callback(err);
    }

    let obj;
    try {
      obj = json.parse(data);
    } catch (e) {
      return callback(e);
    }

    return callback(null, obj);
  });
}

exports.delete = function(namespace, callback) {
  client.del(namespace, callback);
};