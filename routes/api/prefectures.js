var express = require('express');
var router = express.Router();

const prefectures = [
  {
    code: 'JP-01',
    name_en: 'Hokkaido',
    name_ja: '北海道'
  },
  {
    code: 'JP-02',
    name_en: 'Aomori',
    name_ja: '青森県'
  },
  {
    code: 'JP-03',
    name_en: 'Iwate',
    name_ja: '岩手県'
  },
  {
    code: 'JP-04',
    name_en: 'Miyagi',
    name_ja: '宮城県'
  },
  {
    code: 'JP-05',
    name_en: 'Akita',
    name_ja: '秋田県'
  },
  {
    code: 'JP-06',
    name_en: 'Yamagata',
    name_ja: '山形県'
  },
  {
    code: 'JP-07',
    name_en: 'Fukushima',
    name_ja: '福島県'
  },
  {
    code: 'JP-08',
    name_en: 'Ibaraki',
    name_ja: '茨城県'
  },
  {
    code: 'JP-09',
    name_en: 'Tochigi',
    name_ja: '栃木県'
  },
  {
    code: 'JP-10',
    name_en: 'Gunma',
    name_ja: '群馬県'
  },
  {
    code: 'JP-11',
    name_en: 'Saitama',
    name_ja: '埼玉県'
  },
  {
    code: 'JP-12',
    name_en: 'Chiba',
    name_ja: '千葉県'
  },
  {
    code: 'JP-13',
    name_en: 'Tokyo',
    name_ja: '東京島'
  },
  {
    code: 'JP-14',
    name_en: 'Kanagawa',
    name_ja: '神奈川県'
  },
  {
    code: 'JP-15',
    name_en: 'Niigata',
    name_ja: '新潟県'
  },
  {
    code: 'JP-16',
    name_en: 'Toyama',
    name_ja: '富山県'
  },
  {
    code: 'JP-17',
    name_en: 'Ishikawa',
    name_ja: '石川県'
  },
  {
    code: 'JP-18',
    name_en: 'Fukui',
    name_ja: '福井県'
  },
  {
    code: 'JP-19',
    name_en: 'Yamanashi',
    name_ja: '山梨県'
  },
  {
    code: 'JP-20',
    name_en: 'Nagano',
    name_ja: '長野県'
  },
  {
    code: 'JP-21',
    name_en: 'Gifu',
    name_ja: '岐阜県'
  },
  {
    code: 'JP-22',
    name_en: 'Shizuoka',
    name_ja: '静岡県'
  },
  {
    code: 'JP-23',
    name_en: 'Aichi',
    name_ja: '愛知県'
  },
  {
    code: 'JP-24',
    name_en: 'Mie',
    name_ja: '三重県'
  },
  {
    code: 'JP-25',
    name_en: 'Shiga',
    name_ja: '滋賀県'
  },
  {
    code: 'JP-26',
    name_en: 'Kyoto',
    name_ja: '京都府'
  },
  {
    code: 'JP-27',
    name_en: 'Osaka',
    name_ja: '大阪府'
  },
  {
    code: 'JP-28',
    name_en: 'Hyogo',
    name_ja: '兵庫県'
  },
  {
    code: 'JP-29',
    name_en: 'Nara',
    name_ja: '奈良県'
  },
  {
    code: 'JP-30',
    name_en: 'Wakayama',
    name_ja: '和歌山県'
  },
  {
    code: 'JP-31',
    name_en: 'Tottori',
    name_ja: '鳥取県'
  },
  {
    code: 'JP-32',
    name_en: 'Shimane',
    name_ja: '島根県'
  },
  {
    code: 'JP-33',
    name_en: 'Okayama',
    name_ja: '岡山県'
  },
  {
    code: 'JP-34',
    name_en: 'Hiroshima',
    name_ja: '広島県'
  },
  {
    code: 'JP-35',
    name_en: 'Yamaguchi',
    name_ja: '山口県'
  },
  {
    code: 'JP-36',
    name_en: 'Tokushima',
    name_ja: '徳島県'
  },
  {
    code: 'JP-37',
    name_en: 'Kagawa',
    name_ja: '香川県'
  },
  {
    code: 'JP-38',
    name_en: 'Ehime',
    name_ja: '愛媛県'
  },
  {
    code: 'JP-39',
    name_en: 'Kochi',
    name_ja: '高知県'
  },
  {
    code: 'JP-40',
    name_en: 'Fukuoka',
    name_ja: '福岡県'
  },
  {
    code: 'JP-41',
    name_en: 'Saga',
    name_ja: '佐賀県'
  },
  {
    code: 'JP-42',
    name_en: 'Nagasaki',
    name_ja: '長崎県'
  },
  {
    code: 'JP-43',
    name_en: 'Kumamoto',
    name_ja: '熊本県'
  },
  {
    code: 'JP-44',
    name_en: 'Oita',
    name_ja: '大分県'
  },
  {
    code: 'JP-45',
    name_en: 'Miyazaki',
    name_ja: '宮崎県'
  },
  {
    code: 'JP-46',
    name_en: 'Kagoshima',
    name_ja: '鹿児島県'
  },
  {
    code: 'JP-47',
    name_en: 'Okinawa',
    name_ja: '沖縄県'
  }
];

router.get('/', function(req, res, next) {
  res.json(prefectures);
});

module.exports = router;