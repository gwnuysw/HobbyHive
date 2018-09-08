var express = require('express');
var router = express.Router();
/* type this 'DEBUG=hobbyhive:* npm start'*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('FrontDoor', { title: 'HobbyHive' });
});

module.exports = router;
