let scraper = require('./scraper');

function showUsage() {
  console.log([
    'usage: run <command>',
    '',
    'available commands: ' + Object.keys(scraper).join(', ')
  ].join('\n'));
}

let argv = process.argv.slice(2);

if (argv.length < 1) {
  showUsage();
  process.exit(0);
}

let command = argv.shift();
let fn = scraper[command];

if (!fn) {
  showUsage();
  process.exit(0);
}

fn((err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  if (data) {
    console.log(data);
  }
  console.log('Done!');
  process.exit(0);
});