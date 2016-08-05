let scraper = require('./scraper');

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

function run() {
  scraper.listAll(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Done!');
    }
  });
}

run();
setInterval(run, 12 * HOUR);