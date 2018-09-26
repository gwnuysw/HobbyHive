# HobbyHive

hobbyhive는 인터넷의 자료를 각 자료의 항목에 맞게 분류하여 저장하는 웹서비스입니다.

(HobbyHive is category indexing service.)

---
## 개발 참여 Participate contribution

1. hobbyhive 레퍼지토리를 클론 합니다. (clone repository)
```
git clone https://github.com/gwnuysw/HobbyHive.git
```
2. hobbyhive에서 사용중인 nodejs 패키지를 설치하기 위해 hobbyhive디렉토리로 이동한 후 아래 코드를 터미널에서 실행합니다. (install dependencies)
```
npm install
```

3. DB Schema

  **유저정보(User information)**
  ```
  CREATE TABLE users (
      id INT NOT NULL AUTO_INCREMENT ,
      authId VARCHAR(50) NOT NULL ,
      username VARCHAR(30),
      password VARCHAR(255),
      salt VARCHAR(255),
      displayName VARCHAR(50),
      email VARCHAR(50) NOT NULL ,
      PRIMARY KEY (id),
      UNIQUE (authId)
  ) ENGINE = InnoDB;
  ```

  **대문 FirstCategory(FirstCategory information)**
  ```
  CREATE TABLE FirstCategory
     (id INT NOT NULL AUTO_INCREMENT,
     views INT NOT NULL,
     account_id INT NOT NULL,
     created TIMESTAMP DEFAULT NOW(),
     name VARCHAR(255),
     PRIMARY KEY(id),
     UNIQUE(id),
     FOREIGN KEY(account_id) REFERENCES users (id))
     ENGINE=InnoDB DEFAULT CHARSET=utf8;
  ```

4. hobbyhive의 웹서비스를 개인의 로컬 컴퓨터에서 테스트 하기 위해서 mysql설정을 각 개인 컴퓨터 설정에 맞춰서 수정해야합니다. (Modify below codes to test on your own)

### app.js
```
app.use(session({
  secret: 'SG9iYnlIaXZl',
  resave: false,
  saveUninitialized: true,
  store: new MySqlStore({
    host: 'localhost',  //본인 컴퓨터의 데이터 베이스에 맞춰 설정
    port: 3306,
    user: 'root',       //본인 컴퓨터의 데이터 베이스에 맞춰 설정
    password: '1q2w3e!23', //본인 컴퓨터의 데이터 베이스에 맞춰 설정
    database: 'o2'      //본인 컴퓨터의 데이터 베이스에 맞춰 설정
  })
}));
```
### login.js, register.js, home.js
```
//connect Database
var ConnectMysql = mysql.createConnection({
  host : 'localhost', //본인 컴퓨터의 데이터 베이스에 맞춰 설정(set your local database configuration)
  user : 'root',      //본인 컴퓨터의 데이터 베이스에 맞춰 설정
  password : '1q2w3e!23',//본인 컴퓨터의 데이터 베이스에 맞춰 설정
  database : 'o2'     //본인 컴퓨터의 데이터 베이스에 맞춰 설정
});
```

5. 터미널에서 디버깅 코드를 실행 합니다.(Excute Debug on terminal)
```
DEBUG=hobbyhive:* npm start
```
6. localhost:3000으로 접속해 봅니다. (Access localhost:3000)
