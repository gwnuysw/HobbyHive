var express = require('express');
var mysql = require('mysql');

var router = express.Router();

/* type this 'DEBUG=hobbyhive:* npm start'*/

//connect Database
var ConnectMysql = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1q2w3e!23',//'1q2w3e!23',
  database : 'o2'
});
ConnectMysql.connect();


/* GET home page. */
router.get('/', function(req, res, next) {
  var isauthed;
  var sql = "SELECT name From FirstCategory";
  var PageVar = {title : 'HobbyHive'};

  PageVar.isauthed = req.isAuthenticated();

  ConnectMysql.query(sql,function(err,results){
    if(err){
      return console.log(err);
    }
    PageVar.FirstCategory = results;
    console.log(PageVar.FirstCategory);
  });

  res.render('FirstCategory', PageVar);
});

module.exports = router;
