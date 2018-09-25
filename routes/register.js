var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
var bodyParser = require('body-parser');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();


var app = express();

app.use(bodyParser.urlencoded({extended:false}));
//connect Database
var ConnectMysql = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1q2w3e!23',//'1q2w3e!23',
  database : 'o2'
});
ConnectMysql.connect();
/* POST users register information */
router.post('/', function(req, res, next) {
  hasher({password:req.body.password}, function(err, pass, salt, hash){
    var user = {
      authId : 'local:'+req.body.username,
      userName:req.body.username,
      password: hash,
      salt: salt,
      displayName:req.body.nickname
    };
    var sql = "INSERT INTO users SET ?";
    ConnectMysql.query(sql, user, function(err, results){
      var success;
      var message;
      var obj = {};
      if(err){
        console.log(err);
        res.status(500);
      }
      else{
        res.redirect('/login');
      }
    })
  });
});
router.get('/', function(req, res, next){
  var isauthed;
  if(req.isAuthenticated()){
    isauthed = 'true';
  }
  else{
    isauthed = 'false';
  }
  res.render('register',{isauthed:isauthed});
})
module.exports = router;
