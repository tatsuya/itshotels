let assert = require('assert');
let redis = require('../lib/redis');

const NAMESPACE = 'test';

describe('redis', function() {
  beforeEach(function(done) {
    redis.delete(NAMESPACE, done);
  });

  it('should read/write data from/to redis', function(done) {
    let obj = { key1: 'value1' };
    redis.write(NAMESPACE, obj, function(err1, data1) {
      if (err1) {
        return done(err1);
      }
      assert.equal('OK', data1);

      redis.read(NAMESPACE, function(err2, data2) {
        if (err2) {
          return done(err2);
        }
        assert.deepEqual(obj, data2);
        done();
      });
    });
  });
});