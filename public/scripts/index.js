$(document).ready(function() {

  var url = '/api/hotels';

  $.ajax({
    url: url,
    dataType: 'json',
    cache: false,
    success: function(hotels) {
      var events = [];
      hotels.forEach(function(hotel) {
        hotel.monthlyAvailabilities.forEach(function(monthlyAvailability) {
          monthlyAvailability.forEach(function(date) {
            events.push({
              title: hotel.name,
              start: date
            });
          });
        });
      });
      createCalendar(events);
    },
    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
    }
  });

  function createCalendar(events) {
    $('#calendar').fullCalendar({
      lang: 'ja',
      events: events
    });
  }
});
