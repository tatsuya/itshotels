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

  function getAllEnabledCheckboxes() {
    return $('#filter-hotel-checkboxes input[type="checkbox"]:enabled');
  }

  function createCheckboxes(hotels) {
    var checkAllLabel = [
      '<label id="label-check-all" class="disabled mr1">',
      '<input id="check-all" class="align-top" type="checkbox" disabled="disabled" value="checkAll" checked="checked">全て選択',
      '</label>'
    ].join('');

    $('#filter-title').append(checkAllLabel);

    $('#filter-title').on('change', 'input#check-all', function() {
      if (this.checked) {
        getAllEnabledCheckboxes().each(function check() {
          $(this).prop('checked', true);
        });
        updateState();
      }
    });

    var checkNoneLabel = [
      '<label id="label-check-none">',
      '<input id="check-none" class="align-top" type="checkbox" value="checkNone">全て解除',
      '</label>'
    ].join('');

    $('#filter-title').append(checkNoneLabel);

    $('#filter-title').on('change', 'input#check-none', function() {
      if (this.checked) {
        getAllEnabledCheckboxes().each(function uncheck() {
          $(this).prop('checked', false);
        });
        updateState();
      }
    });

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
            '<label class="disabled">',
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
      updateState();
    });
  }

  function allEnabledCheckboxesAreChecked() {
    var enabledCheckboxes = getAllEnabledCheckboxes();
    var total = enabledCheckboxes.length;
    return enabledCheckboxes.filter(function() {
      return this.checked;
    }).length === total;
  }

  function allEnabledCheckboxesAreUnchecked() {
    var enabledCheckboxes = getAllEnabledCheckboxes();
    return enabledCheckboxes.filter(function() {
      return this.checked;
    }).length === 0;
  }

  function updateState() {
    if (allEnabledCheckboxesAreChecked()) {
      $('#filter-title input#check-all')
        .prop('checked', true)
        .prop('disabled', true);
      $('#filter-title label#label-check-all')
        .addClass('disabled');
    } else {
      $('#filter-title input#check-all')
        .prop('checked', false)
        .prop('disabled', false);
      $('#filter-title label#label-check-all')
      .removeClass('disabled');
    }

    if (allEnabledCheckboxesAreUnchecked()) {
      $('#filter-title input#check-none')
        .prop('checked', true)
        .prop('disabled', true);
      $('#filter-title label#label-check-none')
        .addClass('disabled');
    } else {
      $('#filter-title input#check-none')
        .prop('checked', false)
        .prop('disabled', false);
      $('#filter-title label#label-check-none')
        .removeClass('disabled');
    }

    updateCalendar();
  }

  function updateCalendar() {
    var checkedHotelNames = $("#filter-hotel-checkboxes input[type='checkbox']")
      .filter(function() {
        return this.checked;
      }).map(function() {
        return this.value;
      }).get();
    filterEvents(checkedHotelNames);
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
