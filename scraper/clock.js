let feed = require('./feed');

const MINUTE = 60 * 1000;

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
setInterval(run, 2 * MINUTE);