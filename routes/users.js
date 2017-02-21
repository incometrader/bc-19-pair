var express = require('express');
var router = express.Router();

/* GET Pair page */
router.get('/', function(req, res, next) {
  res.render('pair');
});

module.exports = router;
