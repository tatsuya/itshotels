let async = require('async');
let cheerio = require('cheerio');

let page = require('./page');

function collectAvailableDates(url, callback) {
  console.log(`Collecting availability for url=${url}`);
  page.get(url, (error, content) => {
      if (error) {
        return callback(error);
      }
      let $ = cheerio.load(content);
      let dates = [];
      $('select#apply_join_time option').each(function(i) {
        if (i !== 0) {
          dates.push($(this).attr('value'));
        }
      });
      return callback(null, dates);
  });
}

function collectMonthlyUrls(url, callback) {
  console.log(`Collecting monthly URLs for url=${url}`);
  page.get(url, (error, content) => {
    if (error) {
      return callback(error);
    }
    let $ = cheerio.load(content);
    let urls = [];
    // Don't use arrow here! When the callback is fired, the function is fired in the context of the DOM element,
    // so `this` refers to the current element.
    $('li a').each(function() {
      urls.push('https://as.its-kenpo.or.jp' + $(this).attr('href'));
    });
    return callback(null, urls);
  });
}

function collectFacilities(url, callback) {
  console.log(`Collecting facilities for url=${url}`);
  page.get(url, (error, content) => {
    if (error) {
      return callback(error);
    }
    let $ = cheerio.load(content);
    let facilities = [];
    // Don't use arrow here! When the callback is fired, the function is fired in the context of the DOM element,
    // so `this` refers to the current element.
    $('li a').each(function() {
      facilities.push({
        name: $(this).text(),
        url: 'https://as.its-kenpo.or.jp' + $(this).attr('href')
      });
    });
    return callback(null, facilities);
  })
}

let fs = require('fs');
let path = require('path');

function writeToJson(obj, filename) {
  let str = '';
  try {
    str = JSON.stringify(obj, null, 4);
  } catch (err) {
    throw err;
  }
  let filepath = path.join(__dirname, filename);
  console.log(`Writing data to ${filepath}`);
  fs.writeFileSync(filepath, str);
}

collectFacilities('https://as.its-kenpo.or.jp/service_group/index?s=eDBEWnBaU1oxSkhkOWtIZHcxV1o%3D', (error, facilities) => {
  if (error) {
    console.log(error);
  } else {
    async.mapLimit(facilities, 10, (facility, callback) => {
      collectMonthlyUrls(facility.url, callback);
    }, (error2, listOfMonthlyUrls) => {
      if (error2) {
        console.log(error2);
      } else {
        listOfMonthlyUrls.forEach((monthlyUrls, i) => {
          facilities[i].monthlyUrls = monthlyUrls;
        });

        async.mapLimit(facilities, 6, (facility, callback2) => {
          console.log(`Checking availability for ${facility.name}`);
          async.map(facility.monthlyUrls, collectAvailableDates, (error3, monthlyAvailabilities) => {
            if (error3) {
              return callback2(error3);
            } else {
              return callback2(null, {
                name: facility.name,
                monthlyAvailabilities: monthlyAvailabilities
              });
            }
          });
        }, (error4, result) => {
          if (error4) {
            console.log(error4);
          } else {
            writeToJson(result, '../data/hotels.json');
          }
        });
      }
    });
  }
});