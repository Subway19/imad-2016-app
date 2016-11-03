var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;


//remember to change the password field before deploying
var config ={
  user:'subway19',
  database:'subway19',
  host:'db.imad.hasura-app.io',
  port: '5432',
  password: 'db-subway19-80439'

};

var app = express();
//app.use(morgan('combined'));

/*app.use(express.static(__dirname + '/ui'));

app.set('views', path.join(__dirname, '/ui'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); */


function createTemplate(data){

  var heading = data.heading;
  var date = data.date;
  var content= data.content;


  var htmlTemplate= `
    <!doctype html>
<html>
<head>
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link href="/ui/articlestyle.css" rel="stylesheet" />


  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.deep_purple-blue.min.css" />

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">



  <script src="https://code.getmdl.io/1.2.1/material.min.js"></script>




</head>
<body>
  <!-- Always shows a header, even in smaller screens. -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
   <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <!-- Title -->

      <!-- Add spacer, to align navigation to the right -->
      <div class="mdl-layout-spacer"></div>
      <!-- Navigation. We hide it in small screens. -->
      <nav class="mdl-navigation mdl-typography--body-1-force-preferred-font">
        <a class="mdl-navigation__link" href="/"><h6>Home</h6></a>
        <a class="mdl-navigation__link" href="/about"><h6>Resume</h6></a>
        <a class="mdl-navigation__link" href="/article"><h6>Blog</h6></a>
        <a class="mdl-navigation__link" href="/readroom"><h6>Read Room</h6></a>
      </nav>
    </div>
  </header>
  <main class="mdl-layout__content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--1-col"></div>
      <div class="mdl-cell mdl-cell--5-col">
        <div class="container">
          <h2> ${heading} </h2> <br>
          <p> Written by </p> <a href=""> Sumant Bagade </a>  <p> ${date.toDateString()}</p>
          

          <p>${content}t</p>

          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
           Read More
         </button>
         <hr>
       </div>

   </div>
   <div class="mdl-cell mdl-cell--5-col">
     <!--<div class="demo-card-wide mdl-card mdl-shadow--2dp">


      <div class="mdl-card__actions mdl-card--border">
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          Categories
        </a>

        <ul class="demo-list-item mdl-list">
          <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
              Sports
            </span>
          </li>
          <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
              Music
            </span>
          </li>
          <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
              Travel
            </span>
          </li>
          <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
              Fashion
            </span>
          </li>
          <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
              Parties
            </span>
          </li>
        </ul>
      </div>

      </div> -->
  </div>
  <div class="mdl-cell mdl-cell--1-col"></div>
</div>

<footer class="mdl-mini-footer">
  <div class="mdl-mini-footer__left-section">
    <div class="mdl-logo">
      <h6>Application developed as part of IMAD </h6>
    </div>
  </div>

  <div class="mdl-mini-footer__right-section">

    <ul class="mdl-mini-footer__link-list">
      <li> <h5><a href="https://www.hackerearth.com/@sumant2" target="_blank"><i class="fa fa-linkedin fa-lg" aria-hidden="true"></i></a></h5></li>

      <li> <h5><a href="https://www.hackerearth.com/@sumant2" target="_blank"><i class="fa fa-header fa-lg"></i></a></h5></li>
      <li><h5><a href="https://github.com/Subway19" target="_blank"><i class="fa fa-github fa-lg"></i></a></h5></li>
      <li>  <h5><a href="https://www.facebook.com/sumantbagade19" target="_blank"><i class="fa fa-facebook fa-lg"></i></a></h5>
      </li>
    </ul>

  </div>
</footer>
</main>
</div>
</body>
</html>

  `

  return htmlTemplate;
}





app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','about.html'));


  
});

var pool = new Pool(config);

app.get('/test-db', function (req, res) {
  pool.query('SELECT * FROM test', function(err,result){
    if(err){
      res.status(500).send(err.toString());
    }

    else{

      res.send(JSON.stringify(result));
    }
  });  
});


app.get('/articles', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','article.html'));
});

app.get('/articles/:articleName', function (req, res) {


  var articleName = req.params.articleName;

  pool.query("SELECT * FROM article WHERE title = $1", [articleName] , function(err,result){
    if(err){
      res.status(500).send(err.toString());
    }
    else{
      if(result.rows.length==0){
        res.status(404).send('Article not found');
      }
      else{
        var articleData = result.rows[0];
        res.send(createTemplate(articleData));
      }
    }

  });

  
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
