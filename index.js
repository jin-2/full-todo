const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))

app.listen(8080, function() {
  console.log('listening on :8080');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.get('/pet', function (req, res) {
  res.send('pet에 관련 페이지')
});

app.get('/beauty', function (req, res) {
  res.send('beauty에 관련 페이지')
});

app.get('/write', function (req, res) {
  res.sendFile(__dirname + '/write.html')
});

app.post('/add', (req, res) => {
  console.log(req.body)
  res.send('전송완료!')
})
