const express = require('express');
const session = require('express-session')
const app = express();
const path = require('path');
const https = require('https');
const fs = require('fs');

const router = express.Router();
const PORT = 4000;
const db = require("./database.js");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };

  app.set('views', __dirname + '/views');

  app.use(bodyParser.urlencoded({extended: true}));

  app.use(bodyParser.json());

  app.use(session({
    secret: "GroupGifts",
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 3600000
    }
  }));

// Static Files
app.use(express.static('public'));
app.use("/css", express.static(path.join(__dirname + '/public/css')));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/images", express.static(__dirname + '/public/images'));

//add the router
app.use('/', router);

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// render the accueil.html page 
app.get('/', function (req, res) {
    res.render('./welcome');
  });

https.createServer({
key: fs.readFileSync('./key.pem'),
cert: fs.readFileSync('./cert.pem'),
passphrase: 'GroupGift'

}, app).listen(PORT, function (err) {
if (err) console.log(err);
console.log('Running at https://localhost:' + PORT + '/');
});  
