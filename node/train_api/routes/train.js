let express = require('express');
let router = express.Router();
let key = require('../key.js');
let axios = require('axios');
let lineNum = {
  'ＪＲ京浜東北線': '332'
}
let config = {
  headers: {
    'Authorization': 'Bearer ' + key.yelpKey
  }
}

router.get('/', function(req, res, next) {
  axios
  .get('http://www.ekidata.jp/api/l/11' + lineNum[req.query.line] + '.json'
  )
  .then((results) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(results.data);
  })
  .catch((error) => {
    console.log(error)
  })
});

router.get('/restaurants', function(req, res, next) {
  axios
  // .get('https://map.yahooapis.jp/search/local/V1/localSearch?appid=' + key.localSearchKey + '&output=json&results=100&sort=dist&lat=' + req.query.lat + '&lon=' + req.query.lon + '&dist=1&gc=0106'
  // )
  .get(
    // 'https://api.foursquare.com/v2/venues/search?ll=' + req.query.lat + ',' + req.query.lon + '&radius=1000&categoryId=55a59bace4b013909087cb24&locale=ja&client_id=' + key.fsClientId + '&client_secret=' + key.fsClientSec + '&v=20181026',
    'https://api.yelp.com/v3/businesses/search?latitude=' + req.query.lat + '&longitude=' + req.query.lon + '&radius=1000&categories=ramen&locale=ja_JP&sort_by=distance',
    config
  )
  .then((results) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(results.data);
  })
  .catch((error) => {
    console.log(error)
  })
});

router.get('/detail', function(req, res, next) {
  axios
  .get(
    // 'https://api.foursquare.com/v2/venues/' + req.query.VENUE_ID + '/photos' + '?client_id=' + key.fsClientId + '&client_secret=' + key.fsClientSec + '&v=20181026',
    'https://api.yelp.com/v3/businesses/' + req.query.id,
    config,
  )
  .then((results) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(results.data);
  })
  .catch((error) => {
    console.log(error)
  })
});

module.exports = router;
