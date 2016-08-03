let storage = require('./storage/file');

/**
 * Write data to storage.
 *
 * @param  {String} namespace
 * @param  {Object} obj
 * @param  {Function} callback - Invoked with a possible error argument.
 */
exports.write = function(namespace, obj, callback) {
  storage.write(namespace, obj, callback);
};

/**
 * Read data from storage.
 *
 * @param  {String} namespace
 * @param  {Function} callback - Gets `(err, obj)` where obj is read from storage.
 */
exports.read = function(namespace, callback) {
  storage.read(namespace, callback);
};
