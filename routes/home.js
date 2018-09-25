var express = require('express');


var router = express.Router();
/* type this 'DEBUG=hobbyhive:* npm start'*/
/* GET home page. */
router.get('/', function(req, res, next) {
  var isauthed;
  if(req.isAuthenticated()){
    isauthed = 'true';
  }
  else{
    isauthed = 'false';
  }
  console.log(isauthed);
  res.render('FirstCategory', { title: 'HobbyHive', isauthed: isauthed });
});

module.exports = router;
