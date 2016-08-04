let feed = require('./feed');

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

function run() {
  feed(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Done!');
    }
  });
}

run();
setInterval(run, 12 * HOUR);