exports.parse = function(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    throw new Error(`Failed to parse JSON: ${str}`);
  }
};

exports.stringify = function(obj) {
  try {
    return JSON.stringify(obj, null, 4);
  } catch (e) {
    throw new Error(`Failed to stringify object to JSON: ${obj}`);
  }
};
