$(document).ready(function() {

  var areas = {
    'トスラブ湯沢': {
      prefecture: {
        code: 'JP-15',
        name_ja: '新潟県'
      }
    },
    'トスラブ箱根ビオーレ': {
      prefecture: {
        code: 'JP-14',
        name_ja: '神奈川県'
      }
    },
    'トスラブ箱根和奏林': {
      prefecture: {
        code: 'JP-14',
        name_ja: '神奈川県'
      }
    },
    'トスラブ館山ルアーナ': {
      prefecture: {
        code: 'JP-12',
        name_ja: '千葉県'
      }
    },
    'ブルーベリーヒル勝浦': {
      prefecture: {
        code: 'JP-12',
        name_ja: '千葉県'
      }
    },
    'ホテルハーヴェスト　スキージャム勝山': {
      prefecture: {
        code: 'JP-18',
        name_ja: '福井県'
      }
    },
    'ホテルハーヴェスト伊東': {
      prefecture: {
        code: 'JP-22',
        name_ja: '静岡県'
      }
    },
    'ホテルハーヴェスト南紀田辺': {
      prefecture: {
        code: 'JP-30',
        name_ja: '和歌山県'
      }
    },
    'ホテルハーヴェスト斑尾': {
      prefecture: {
        code: 'JP-20',
        name_ja: '長野県'
      }
    },
    'ホテルハーヴェスト旧軽井沢':{
      prefecture: {
        code: 'JP-20',
        name_ja: '長野県'
      }
    },
    'ホテルハーヴェスト那須': {
      prefecture: {
        code: 'JP-09',
        name_ja: '栃木県'
      }
    },
    'ホテル日航プリンセス京都': {
      prefecture: {
        code: 'JP-26',
        name_ja: '京都府'
      }
    },
    'リゾートホテル蓼科': {
      prefecture: {
        code: 'JP-20',
        name_ja: '長野県'
      }
    },
    '中沢ヴィレッジ': {
      prefecture: {
        code: 'JP-10',
        name_ja: '群馬県'
      }
    },
    '琵琶レイクオーツカ': {
      prefecture: {
        code: 'JP-25',
        name_ja: '滋賀県'
      }
    },
    '角間温泉　岩屋館': {
      prefecture: {
        code: 'JP-20',
        name_ja: '長野県'
      }
    },
    '鎌倉パークホテル': {
      prefecture: {
        code: 'JP-14',
        name_ja: '神奈川県'
      }
    }
  };

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
    var hotels = {};
    hotelsData[0].forEach(function(hotel) {
      hotels[hotel.name] = {
        name: hotel.name,
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

    createCheckboxes(hotels, prefecturesData[0]);
    createCalendar();
  }, function error(xhr, status, err) {
    console.error(url, status, err.toString());
  });

  function getPrefecture(prefectures, code) {
    for (var i = 0; i < prefectures.length; i++) {
      var prefecture = prefectures[i];
      if (prefecture.code === code) {
        return prefecture;
      }
    }
    return null;
  }

  function createCheckboxes(hotels, prefectures) {

    var hotelPrefectures = {};

    Object.keys(hotels).forEach(function(key) {
      var hotel = hotels[key];
      var area = areas[hotel.name];
      var prefectureCode = area.prefecture.code;
      if (!hotelPrefectures[prefectureCode]) {
        hotelPrefectures[prefectureCode] = [];
      }
      hotelPrefectures[prefectureCode].push(hotel);
    });

    var html = [];
    html.push('<ul class="list-reset">');
    Object.keys(hotelPrefectures).sort().forEach(function(prefectureCode) {
      var prefecture = getPrefecture(prefectures, prefectureCode);
      var hotels = hotelPrefectures[prefectureCode];
      html.push('<li>');
      html.push('<ul class="list-reset">');
      html.push('<li class="inline-block mr2"><span class="bold">' + prefecture.name_ja + '</span></li>');
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
