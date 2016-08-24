$(document).ready(function() {
  var events = [];

  $.when($.ajax({
    url: '/api/hotels',
    dataType: 'json',
    cache: false
  }), $.ajax({
    url: '/api/prefectures',
    dataType: 'json',
    cache: false
  })).then(function success(hotelsData, prefecturesData) {
    // TODO: Remove prefecturesData as it's not used
    var hotels = {};
    hotelsData[0].forEach(function(hotel) {
      hotels[hotel.name] = {
        name: hotel.name,
        prefecture: hotel.prefecture,
        eventCount: 0
      };
      hotel.monthlyAvailabilities.forEach(function(monthlyAvailability) {
        monthlyAvailability.dates.forEach(function(date) {
          hotels[hotel.name].eventCount++;
          events.push({
            title: hotel.name,
            start: date,
            url: monthlyAvailability.url
          });
        });
      });
    });

    createCheckboxes(hotels);
    createCalendar();
  }, function error(xhr, status, err) {
    console.error(url, status, err.toString());
  });

  function createCheckboxes(hotels) {

    var hotelPrefectures = {};

    Object.keys(hotels).forEach(function(key) {
      var hotel = hotels[key];
      var prefectureCode = hotel.prefecture.code;
      if (!hotelPrefectures[prefectureCode]) {
        hotelPrefectures[prefectureCode] = {
          name_ja: hotel.prefecture.name_ja,
          hotels: []
        };
      }
      hotelPrefectures[prefectureCode].hotels.push(hotel);
    });

    var html = [];
    html.push('<ul class="list-reset">');
    Object.keys(hotelPrefectures).sort().forEach(function(prefectureCode) {
      var hotels = hotelPrefectures[prefectureCode].hotels;
      var prefectureName = hotelPrefectures[prefectureCode].name_ja;
      html.push('<li>');
      html.push('<ul class="list-reset">');
      html.push('<li class="inline-block mr2"><span class="bold">' + prefectureName + '</span></li>');
      hotels.forEach(function(hotel) {
        if (hotel.eventCount === 0) {
          html.push([
            '<li class="inline-block mr1">',
            '<label style="color: #ccc;">',
            '<input class="align-top" type="checkbox" disabled="disabled" value="' + hotel.name + '">' + hotel.name + ' (' + hotel.eventCount + ')',
            '</label>',
            '</li>'
          ].join(''));
        } else {
          html.push([
            '<li class="inline-block mr1">',
            '<label>',
            '<input class="align-top" type="checkbox" value="' + hotel.name + '" checked="checked">' + hotel.name + ' (' + hotel.eventCount + ')',
            '</label>',
            '</li>'
          ].join(''));
        }
      });
      html.push('</li>');
      html.push('</ul>');
    });
    html.push('</ul>');

    $('#filter-hotel-checkboxes').append(html.join(''));

    $('#filter-hotel-checkboxes').on('change', 'input[type="checkbox"]', function() {
      var checkedHotelNames = $("#filter-hotel-checkboxes input[type='checkbox']")
        .filter(function() {
          return this.checked;
        }).map(function() {
          return this.value;
        }).get();
      filterEvents(checkedHotelNames);
    });
  }

  function createCalendar() {
    $('#calendar').fullCalendar({
      height: 'auto',
      lang: 'ja',
      businessHours: true, // display buisiness hour
      events: events,
      eventClick: function(event) {
        if (event.url) {
          window.open(event.url);
          return false;
        }
      }
    });
  }

  function filterEvents(hotelNames) {
    var filteredEvents = events.filter(function(event) {
      return hotelNames.indexOf(event.title) > -1;
    })
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', filteredEvents);
  }
});
