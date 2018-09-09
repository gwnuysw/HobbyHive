var express = require('express');

var router = express.Router();
/* type this 'DEBUG=hobbyhive:* npm start'*/
/* GET home page. */
router.get('/', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
