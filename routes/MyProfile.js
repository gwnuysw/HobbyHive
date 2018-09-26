var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

var router = express.Router();

var ConnectMysql = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1q2w3e!23',//'1q2w3e!23',
  database : 'o2'
});
ConnectMysql.connect();

router.get('/', function(req, res, next){
  var isauthed;
  if(req.isAuthenticated()){
    isauthed = 'true';
  }
  else{
    isauthed = 'false';
  }
  res.render('Myprofile',{isauthed:isauthed});
});

router.get('/DeleteAccount', function(req, res, next){
  var isauthed;
  var PageVar = {title : 'HobbyHive'};
  PageVar.isauthed = req.isAuthenticated();
  res.render('DeleteAccount',PageVar);
});


router.post('/DeleteAccount', function(req,res,next){
  var authId = 'local:'+req.body.username;

  var sql = "Delete From users Where authId = ?";
  ConnectMysql.query(sql, [authId], function(err, results){
    if(err){
      console.log(err);
      res.status(500);
    }
    else{
      console.log("delete success");
      req.logout();
      res.redirect('/');
    }
  });
});
module.exports = router;
