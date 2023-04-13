# Note

서버 재실행 모듈: nodemon

## REST API란?
1. Uniform interface(간결, 형식의 일관성, 예측가능)
2. Client-server 역할 구분하기
3. Stateless(요청들은 독립적으로 처리)
4. Cacheable
5. Layered System
6. Code on Demand

### URL 이름짓기 관습
- 단어들을 동사보다는 명사 위주로 구성함
- 응용해서 다른 정보들을 쉽게 가져올 수 있을 정도로 일관성 있음
- 대충 봐도 어떤 정보가 들어올지 예측이 가능함
- 띄어쓰기는 언더바\_대신 대시-기호-사용
- 파일 확장자 쓰지 말기 (.html 이런거)
- 하위 문서들을 뜻할 땐 / 기호를 사용함 (하위폴더같은 느낌)
-

#### 예제
instagram.com/explore/tags/kpop
instagram.com/explore/tags/food
facebook.com/natgeo/photos
facebook.com/bbc/photos

## Database
데이터베이스는 SQL이라는 언어를 써서 데이터를 입력, 출력한다.

### MongoDB 사용하는 이유
- 처음 다룰 때 어려운 셋팅작업이 필요하지 않음 (스키마 생성 등 필요없음)
- SQL 안배워도 됨
- 복잡한 자료형 몰라도 됨
- 평생 무료 호스팅해주는 곳이 있음 

### 연동하기
1. MongoDB atlas 가입
   - Free 선택 가입
   - Database Access 메뉴에서 DB 접속용 아이디/비번 생성
   - Network Access 메뉴에서 IP 추가
     - Allow access from anywhere / 0.0.0.0/0
   - Database / collection 만들기
     - Cluster는 하나의 호스팅 공간 그 안에 데이터베이스
2. DB 접속하는 URL 찾아오기
   - CONNECT라는 버튼
   - npm install mongdb
    ```javascript
    const MongoClient = require('mongodb').MongoClient;
    
    MongoClient.connect('아까 챙겨온 접속URL', function(에러, client){
      if (에러) return console.log(에러);
      //서버띄우는 코드 여기로 옮기기
      app.listen('8080', function(){
        console.log('listening on 8080')
      });
    })
    ```
   
### DB collection에 자료 추가하기(Create)
    ```javascript
    db.collection('post').insertOne( {이름 : 'John', _id : 100} , function(에러, 결과){
        console.log('저장완료'); 
      });
    ```

### DB collection 자료 가져오기(Read)
    ```javascript
    app.get('/list', async function (req, res) {
      const result = await db.collection('post').find({}).toArray();
      res.render('list.ejs', { posts: result });
    });
    ```

### DB collection 자료 업데이트(Update)
    ```javascript
      db.collection('counter').updateOne(
        { name: '게시물갯수' },
        { $inc: { totalPost: 1 } },
        function (error, result) {
          if (error) {
            return console.log(error);
          }
        }
      );
    ```

### DB collection 자료 삭제(Delete)
HTML에 form method는 GET, POST만 지원한다.
DELETE는 요청은 어떻게 해야 할까?

1. method-override 라이브러리 이용
   - form에서 DELETE 요청 가능해짐
2. JavaScript AJAX를 이용

```javascript
app.delete('/delete/:id', async (req, res) => {
  db.collection('post')
    .deleteOne({ _id: Number(req.params.id) })
    .then((error, result) => {
      console.log(error, result);
    })
    .catch((error) => {
      console.log(error);
    });
  res.send('삭제완료');
});
```
