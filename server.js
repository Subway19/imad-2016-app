var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
//app.use(morgan('combined'));

app.use(express.static(__dirname + '/ui'));

app.set('views', path.join(__dirname, '/ui'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/home', function (req, res) {
  res.render('index');
});


app.get('/about', function (req, res) {
  res.send('About page here');
});


app.get('/resume', function (req, res) {
  res.render('Resume here');
});






var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port` + port );
});
