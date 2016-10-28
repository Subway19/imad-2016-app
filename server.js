var express = require('express');
var morgan = require('morgan');
var path = require('path');


var app = express();
//app.use(morgan('combined'));

/*app.use(express.static(__dirname + '/ui'));

app.set('views', path.join(__dirname, '/ui'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); */







app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','about.html'));


  
});


app.get('/article', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','article.html'));
});


app.get('/resume', function (req, res) {
  res.send('Resume here');
});

app.get('/chatroom', function (req, res) {
    res.sendFile(path.join(__dirname,'ui','chatroom.html'));
});

app.get('/readroom', function (req, res) {
    res.sendFile(path.join(__dirname,'ui','readroom.html'));
});



// serving static files 
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','style.css'));
});


app.get('/ui/aboutstyle.css', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','aboutstyle.css'));
});


app.get('/ui/articlestyle.css', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','articlestyle.css'));
});

app.get('/ui/readroom.css', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','readroom.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','main.js'));
});


app.get('/ui/readroomscript.js', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','readroomscript.js'));
});


app.get('/ui/readroomjquery.min.js', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','readroomjquery.min.js'));
});


app.get('/ui/against.jpg', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','against.jpg'));
});

app.get('/ui/user.jpg', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','user.jpg'));
});

app.get('/ui/user1.JPG', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','user1.JPG'));
});









var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ` + port );
});
