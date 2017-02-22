var express = require('express');
var router = express.Router();
var bodyParser    = require('body-parser');

/* GET Pair page */
router.get('/', function(req, res, next) {
  res.render('pair');
});

module.exports = router;
