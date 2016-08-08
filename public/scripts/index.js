$(document).ready(function() {

  var url = '/api/hotels';

  var events = [];

  $.ajax({
    url: url,
    dataType: 'json',
    cache: false,
    success: function(data) {
      var hotels = [];
      data.forEach(function(hotel) {
        hotels.push(hotel.name);
        hotel.monthlyAvailabilities.forEach(function(monthlyAvailability) {
          monthlyAvailability.dates.forEach(function(date) {
            events.push({
              title: hotel.name,
              start: date,
              url: monthlyAvailability.url
            });
          });
        });
      });

      createSelectOptions(hotels);
      createCalendar();
    },
    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
    }
  });

  function createSelectOptions(hotels) {
    hotels.forEach(function(hotel) {
      $('#hotels').append('<option value="' + hotel + '">' + hotel + '</option>');
    });
  }

  function createCalendar() {
    $('#calendar').fullCalendar({
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

  function filterEvents(hotelName) {
    var filteredEvents = events.filter(function(event) {
      if (hotelName === 'None') {
        return true;
      }
      return event.title === hotelName;
    })
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', filteredEvents);
  }

  $('#hotels').change(function() {
    filterEvents(this.value);
    // console.log(this.value);
  });
});
