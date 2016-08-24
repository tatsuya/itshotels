var express = require('express');
var router = express.Router();

var Hotels = require('../../lib/model/hotels');

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

router.get('/', function(req, res, next) {
    Hotels.get(function(err, hotels) {
    if (err) {
      return next(err);
    }
    res.json(hotels.data.map(function(hotel) {
      hotel.prefecture = areas[hotel.name].prefecture;
      return hotel;
    }));
  });
});

module.exports = router;