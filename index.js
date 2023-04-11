const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const connectingString = `mongodb+srv://admin:${encodeURIComponent(
  'jobko#2022'
)}@cluster0.nxoiru2.mongodb.net/?retryWrites=true&w=majority`;

// DB 접속이 완료되면 node 서버를 띄운다.
MongoClient.connect(connectingString)
  .then(() => {
    app.listen(8080, function () {
      console.log('listening on :8080');
    });
  })
  .catch((error) => console.log(error));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/pet', function (req, res) {
  res.send('pet에 관련 페이지');
});

app.get('/beauty', function (req, res) {
  res.send('beauty에 관련 페이지');
});

app.get('/write', function (req, res) {
  res.sendFile(__dirname + '/write.html');
});

app.post('/add', (req, res) => {
  console.log(req.body);
  res.send('전송완료!');
});
