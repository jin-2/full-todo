const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const connectingString = `mongodb+srv://admin:${encodeURIComponent(
  'jobko#2022'
)}@cluster0.nxoiru2.mongodb.net/?retryWrites=true&w=majority`;

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

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

app.delete('/delete/:id', async (req, res) => {
  db.collection('post')
    .deleteOne({ _id: Number(req.params.id) })
    .then((error, result) => {
      if (!error) {
        res.status(200).message('삭제되었습니다.');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  res.send('삭제완료');
});

app.get('/detail/:id', async function (req, res) {
  const result = await db
    .collection('post')
    .findOne({ _id: Number(req.params.id) });
  res.render('detail.ejs', { data: result });
});

app.get('/edit/:id', async function (req, res) {
  const result = await db
    .collection('post')
    .findOne({ _id: Number(req.params.id) });
  res.render('edit.ejs', { data: result });
});

// app.put('/edit', async (req, res) => {
//   console.log('=======', req.body);
//   const aa = await db
//     .collection('post')
//     .updateOne(
//       { _id: Number(req.body.id) },
//       { $set: { title: req.body.title, date: req.body.date } }
//     );
//   console.log('888888', aa);
// });

app.put('/edit', function (req, res) {
  db.collection('post').updateOne(
    { _id: parseInt(req.body.id) },
    { $set: { 제목: req.body.title, 날짜: req.body.date } },
    function () {
      console.log('수정완료');
      res.redirect('/list');
    }
  );
});
