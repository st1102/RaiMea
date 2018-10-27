var express = require('express');
var router = express.Router();
var key = require('../key.js');
var axios = require('axios');
var lineNum = {
  'ＪＲ京浜東北線': '332'
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
  .get('https://api.foursquare.com/v2/venues/search?ll=' + req.query.lat + ',' + req.query.lon + '&radius=1000&categoryId=55a59bace4b013909087cb24&locale=ja&client_id=' + key.fsClientId + '&client_secret=' + key.fsClientSec + '&v=20181026'
  )
  .then((results) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(results.data);
  })
  .catch((error) => {
    console.log(error)
  })
});

router.get('/photo', function(req, res, next) {
  axios
  .get('https://api.foursquare.com/v2/venues/' + req.query.VENUE_ID + '/photos' + '?client_id=' + key.fsClientId + '&client_secret=' + key.fsClientSec + '&v=20181026'
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
