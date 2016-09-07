module.exports = function() {
  return function(req, res, next) {
    if (req.hostname === 'itshotels.herokuapp.com') {
      return res.redirect(301, 'http://itshotels.info' + req.path);
    }
    next();
  };
};