const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const connectingString = `mongodb+srv://admin:${encodeURIComponent(
  'jobko#2022'
)}@cluster0.nxoiru2.mongodb.net/?retryWrites=true&w=majority`;

app.set('view engine', 'ejs');

// DB 접속이 완료되면 node 서버를 띄운다.
let db;
MongoClient.connect(connectingString)
  .then((client) => {
    db = client.db('todoapp');

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

app.post('/add', async (req, res) => {
  console.log(req.body);
  const { totalPost } = await db
    .collection('counter')
    .findOne({ name: '게시물갯수' });

  db.collection('post')
    .insertOne({ _id: totalPost + 1, ...req.body })
    .then(() => {
      db.collection('counter').updateOne(
        { name: '게시물갯수' },
        { $inc: { totalPost: 1 } },
        function (error, result) {
          if (error) {
            return console.log(error);
          }
        }
      );
      res.send('Success');
    })
    .catch((error) => {
      res.send('Fail');
    });
});

app.get('/list', async function (req, res) {
  const result = await db.collection('post').find({}).toArray();
  res.render('list.ejs', { posts: result });
});
