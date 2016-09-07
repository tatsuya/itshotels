'use strict';

let _ = require('lodash');
let repo = require('../repository');

const NAMESPACE = 'hotels';

const metadata = {
  toslove_viole: {
    name: 'トスラブ箱根ビオーレ',
    url: 'http://www.its-kenpo.or.jp/shisetsu/hoyou/chokuei/toslove_viole/index.html',
    image: {
      path:  '/images/toslove_viole.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/toslove_viole/d-004.jpg',
    },
    prefecture: {
      code: 'JP-14',
      name_ja: '神奈川県'
    }
  },
  toslove_wasorin: {
    name: 'トスラブ箱根和奏林',
    image: {
      path: '/images/toslove_wasorin.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/toslove_wasorin/d-017_01.jpg',
    },
    prefecture: {
      code: 'JP-14',
      name_ja: '神奈川県'
    }
  },
  toslove_luana: {
    name: 'トスラブ館山ルアーナ',
    image: {
      path: '/images/toslove_luana.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/toslove_luana/gaikan.jpg',
    },
    prefecture: {
      code: 'JP-12',
      name_ja: '千葉県'
    }
  },
  toslove_yuzawa: {
    name: 'トスラブ湯沢',
    image: {
      path: '/images/toslove_yuzawa.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/toslove_yuzawa/d-043.jpg',
    },
    prefecture: {
      code: 'JP-15',
      name_ja: '新潟県'
    }
  },
  nakazawa: {
    name: '中沢ヴィレッジ',
    image: {
      path: '/images/nakazawa.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/nakazawa/d-057.jpg',
    },
    prefecture: {
      code: 'JP-10',
      name_ja: '群馬県'
    }
  },
  katsuura: {
    name: 'ブルーベリーヒル勝浦',
    image: {
      path: '/images/katsuura.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/katsuura/d-058.jpg',
    },
    prefecture: {
      code: 'JP-12',
      name_ja: '千葉県'
    }
  },
  biwako: {
    name: '琵琶レイクオーツカ',
    image: {
      path: '/images/biwako.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/biwako/d-062.jpg',
    },
    prefecture: {
      code: 'JP-25',
      name_ja: '滋賀県'
    }
  },
  nasu: {
    name: 'ホテルハーヴェスト那須',
    image: {
      path: '/images/nasu.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/nasu.jpg',
    },
    prefecture: {
      code: 'JP-09',
      name_ja: '栃木県'
    }
  },
  ito: {
    name: 'ホテルハーヴェスト伊東',
    image: {
      path: '/images/ito.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/ito.jpg',
    },
    prefecture: {
      code: 'JP-22',
      name_ja: '静岡県'
    }
  },
  katsuyama: {
    name: 'ホテルハーヴェスト　スキージャム勝山',
    image: {
      path: '/images/katsuyama.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/katsuyama.jpg',
    },
    prefecture: {
      code: 'JP-18',
      name_ja: '福井県'
    }
  },
  nanki: {
    name: 'ホテルハーヴェスト南紀田辺',
    image: {
      path: '/images/nanki.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/nanki.jpg',
    },
    prefecture: {
      code: 'JP-30',
      name_ja: '和歌山県'
    }
  },
  madarao: {
    name: 'ホテルハーヴェスト斑尾',
    image: {
      path: '/images/madarao.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/madarao.jpg',
    },
    prefecture: {
      code: 'JP-20',
      name_ja: '長野県'
    }
  },
  kyoto: {
    name: 'ホテル日航プリンセス京都',
    image: {
      path: '/images/kyoto.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/kyoto.jpg',
    },
    prefecture: {
      code: 'JP-26',
      name_ja: '京都府'
    }
  },
  tateshina: {
    name: 'リゾートホテル蓼科',
    image: {
      path: '/images/tateshina.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/summer/tateshina.jpg',
    },
    prefecture: {
      code: 'JP-20',
      name_ja: '長野県'
    }
  },
  kyukaruizawa: {
    name: 'ホテルハーヴェスト旧軽井沢',
    image: {
      path: '/images/kyukaruizawa.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/summer/kyukaruizawa.jpg',
    },
    prefecture: {
      code: 'JP-20',
      name_ja: '長野県'
    }
  },
  kamakura: {
    name: '鎌倉パークホテル',
    image: {
      path: '/images/kamakura.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/summer/kamakura.jpg',
    },
    prefecture: {
      code: 'JP-14',
      name_ja: '神奈川県'
    }
  },
  iwaya: {
    name: '角間温泉　岩屋館',
    image: {
      path: '/images/iwaya.jpg',
      url: 'http://www.its-kenpo.or.jp/images/shisetsu/hoyou/chokuei/tsunen/iwaya.jpg',
    },
    prefecture: {
      code: 'JP-20',
      name_ja: '長野県'
    }
  }
};

class Hotels {
  constructor(data) {
    this.data = data.map(function(hotel) {
      let metadata = Hotels.findMetadataByName(hotel.name);
      return _.merge(hotel, metadata);
    });
  }

  save(callback) {
    repo.write(NAMESPACE, this.data, callback);
  }

  static get(callback) {
    repo.read(NAMESPACE, function(err, data) {
      if (err) {
        // TODO: Propagate error to upstream.
        console.log(err);
        return callback(null, new Hotels([]));
      }
      if (!data) {
        return callback(null, new Hotels([]));
      }
      return callback(null, new Hotels(data));
    });
  }

  static getOne(key, callback) {
    Hotels.get(function(err, hotels) {
      if (err) {
        return callback(err);
      }
      let found = hotels.data.find(function(hotel) {
        return hotel.key = key;
      });
      if (!found) {
        return callback(new Error('hotel not found: ' + key));
      }
      return callback(null, found);
    })
  }

  static getMetadata(key) {
    return metadata[key];
  }

  static listMetadata() {
    return metadata;
  }

  static findMetadataByName(name) {
    let foundKey = Object.keys(metadata).find(function(key) {
      let hotel = metadata[key];
      return hotel.name === name;
    });
    if (!foundKey) {
      return null;
    }
    let hotelMetadata = _.cloneDeep(metadata[foundKey]);
    hotelMetadata.key = foundKey;
    return hotelMetadata;
  }
}

module.exports = Hotels;