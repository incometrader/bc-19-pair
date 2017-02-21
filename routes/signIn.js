var express = require('express');
var router = express.Router();

/* GET Sign In Page */
router.get('/signIn', function(req, res, next) {
  res.render('signin', { title: 'Sign In' });
});

module.exports = router;