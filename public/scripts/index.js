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
            url: '/hotels/' + hotel.key,
            start: date
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

  function createCheckboxShortcuts() {
    var html = [];
    html.push('<div class="form">')
    html.push('<div class="form-item checkboxes-inline" style="margin-bottom: 12px;">');

    var checkAllLabel = [
      '<label id="label-check-all" class="disabled">',
      '<input id="check-all" type="checkbox" disabled="disabled" value="checkAll" checked="checked"> 全て選択',
      '</label>'
    ].join('');

    var checkNoneLabel = [
      '<label id="label-check-none">',
      '<input id="check-none" type="checkbox" value="checkNone"> 全て解除',
      '</label>'
    ].join('');

    html.push(checkAllLabel);
    html.push(checkNoneLabel);
    html.push('</div>');
    html.push('</div>');
    return html.join('');
  }

  function createCheckboxes(hotels) {
    $('#filter-title').append(createCheckboxShortcuts());

    $('#filter-title').on('change', 'input#check-all', function() {
      if (this.checked) {
        getAllEnabledCheckboxes().each(function check() {
          $(this).prop('checked', true);
        });
        updateState();
      }
    });

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
    html.push('<table class="flat">');
    html.push('<tbody>');
    Object.keys(hotelPrefectures).sort().forEach(function(prefectureCode) {
      var hotels = hotelPrefectures[prefectureCode].hotels;
      var prefectureName = hotelPrefectures[prefectureCode].name_ja;
      html.push('<tr>');
      html.push('<td class="col-1"><span class="bold">' + prefectureName + '</span></td>');
      html.push('<td>');
      html.push('<ul>');
      hotels.forEach(function(hotel) {
        if (hotel.eventCount === 0) {
          html.push([
            '<li>',
            '<label class="disabled">',
            '<input class="align-top" type="checkbox" disabled="disabled" value="' + hotel.name + '">' + hotel.name + ' (' + hotel.eventCount + ')',
            '</label>',
            '</li>'
          ].join(''));
        } else {
          html.push([
            '<li>',
            '<label>',
            '<input class="align-top" type="checkbox" value="' + hotel.name + '" checked="checked">' + hotel.name + ' (' + hotel.eventCount + ')',
            '</label>',
            '</li>'
          ].join(''));
        }
      });
      html.push('</ul>');
      html.push('</td>');
      html.push('</tr>');
    });
    html.push('</tbody>');
    html.push('</table>');

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
          window.location.href = event.url;
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
