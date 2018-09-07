require('dotenv').config();
const express = require('express');
const env = process.env.NODE_ENV || 'development';
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const request = require('request');
var mongoose = require('mongoose');
const exphbs = require('express-handlebars');

// for bodyparser
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// for handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// models
// const db = require('./models');

// routes
// require('./routes')(app);

// database
mongoose.connect('mongodb://localhost/news_scraper', { useNewUrlParser: true });


app.listen(PORT, function() {
  console.log(
    '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
    PORT,
    PORT
  );
});


