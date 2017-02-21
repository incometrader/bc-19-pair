var express = require('express');
var router = express.Router();

/* GET Pair Page */
router.get('/pair', function(req, res, next) {
  res.render('pair', { title: 'DevsPair' });
});

module.exports = router;