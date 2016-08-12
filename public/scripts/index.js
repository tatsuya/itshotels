$(document).ready(function() {

  var url = '/api/hotels';

  var events = [];

  $.ajax({
    url: url,
    dataType: 'json',
    cache: false,
    success: function(data) {
      var hotels = {};
      data.forEach(function(hotel) {
        hotels[hotel.name] = {
          name: hotel.name,
          eventCount: 0
        };
        hotel.monthlyAvailabilities.forEach(function(monthlyAvailability) {
          console.log(monthlyAvailability);
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
    },
    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
    }
  });

  function createCheckboxes(hotels) {
    Object.keys(hotels).forEach(function(key) {
      var hotel = hotels[key];
      var html;
      if (hotel.eventCount === 0) {
        html = [
          '<label style="padding-right: 15px; color: #ccc;">',
          '<input type="checkbox" disabled="disabled" value="' + key + '">' + hotel.name + ' (' + hotel.eventCount + ')',
          '</label>'
        ].join('');
      } else {
        html = [
          '<label style="padding-right: 15px;">',
          '<input type="checkbox" value="' + key + '" checked="checked">' + hotel.name + ' (' + hotel.eventCount + ')',
          '</label>'
        ].join('');
      }
      $('#filter-hotel-checkboxes').append(html);
    });

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
