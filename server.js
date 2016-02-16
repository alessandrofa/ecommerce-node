
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var User = require('./models/user')
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var app = express();

mongoose.connect('mongodb://root:abc123@ds059155.mongolab.com:59155/ecommerce1710', function (err){
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected to the database.");
    }
})

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ resave: true, saveUnitialized: true, secret: "Arash@$@!#@" }));
app.use(flash());

app.engine('ejs', engine);
app.set('view engine', 'ejs');

var port = 3000;
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(userRoutes);
app.use(mainRoutes);

app.listen(port, function (err) {
    if (err) throw err;
    console.log("Server is running on port " + port + ".");
});
