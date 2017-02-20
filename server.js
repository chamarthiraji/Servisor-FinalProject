// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require(`path`);

// Our newest addition to the dependency family
var mongoose = require("mongoose");
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");

mongoose.Promise = Promise;
//var specializationData = require('./api/models/specializationData');
var serviceProviders = require('./api/models/serviceProviders');
var userData = require('./api/models/userData');
var Review = require('./api/models/Review');

// Initialize Express
var app = express();

// Configure the app to use body parser and morgan
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Static file support with public folder
app.use(express.static("public"));

var mongoURI = process.env.MONGODB_URI || "mongodb://localhost/userServices";
mongoose.connect(mongoURI);
var db = mongoose.connection;

//Show any mongoose errors
db.on("error",function(error){
	console.log("Mongoose Error: ",error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


const PORT = process.env.PORT || 3000;
//var mongoURI = process.env.MONGODB_URI || "mongodb://localhost/reddit";

console.log("PORT: ",PORT);
//console.log("mongoURI: ",mongoURI);
app.use(express.static('public'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/posts', posts);
//mongoose.connect('mongodb://heroku_q6dxjtf3:jdbs3ma67kv6mt1ie7umfh3i0a@ds111549.mlab.com:11549/heroku_q6dxjtf3');
//mongoose.connect('mongodb://localhost/userServices');
//mongoose.connect(mongoURI);

const userServiceRoutes = require('./api/routes/userServiceRoutes');
app.use('/api', userServiceRoutes);
app.get(`*`, function(req, res) {
  res.sendFile('public/index.html', { root: __dirname });
});


app.listen(PORT, (err) => {
  if (err) {
    return console.log('something bad happened on port:'+PORT, err)
  }
	console.log('server started on port: ', PORT);
});
