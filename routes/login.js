var express = require('express');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var passport = require('passport');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var app = express();

var router = express.Router();

//connect Database
var ConnectMysql = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1q2w3e!23',
  database : 'o2'
});
ConnectMysql.connect();

//처음 로그인 할때 serializeUser가 실행되고
passport.serializeUser(function(user, done){
  done(null, user.authId);
  console.log('logggggggg');
});
//로그인한 상태 유지를 deserializeUser 에서 확인한다.
passport.deserializeUser(function(id, done){
  var sql="SELECT * FROM users WHERE authId=?"
  done(null, [id], function(err, results){
    if(err){
      done('There is no user');
    }
    else{
      done(null, results[0]);
    }
  });
});

passport.use(new LocalStrategy(//자체 인증 전략
  function(username, password, done){
    var uname = username;
    var pwd = password;
    var sql = 'SELECT * FROM users WHERE authId=?';
    ConnectMysql.query(sql, ['local:'+uname], function(err,results){
      var user = results[0];
      console.log(user);
      if(err){
        return done('There is no user');
      }
      return hasher({password:pwd, salt:user.salt}, function(err, pass, salt,hash){
       if(pwd === user.password)
       {
         done(null, user); //serializeUser가 호출된다
       }
       else{
         done(null, false);  //false 면
       }
      });
    });
  }
));

/* POST users Login information */
router.post('/',
  passport.authenticate('local'),
  function(req, res){
    res.redirect('/');
  });
module.exports = router;
