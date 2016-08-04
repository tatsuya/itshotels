let feed = require('./feed');

feed(function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Done!');
  process.exit(0);
});