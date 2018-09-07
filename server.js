require('dotenv').config();
const express = require('express'),
      env = process.env.NODE_ENV || 'development',
      app = express(),
      PORT = process.env.PORT || 3000,
      bodyParser = require('body-parser'),
      exphbs = require('express-handlebars'),
      mongoose = require('mongoose'),
      config = require('./config/db');

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
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// database connection
mongoose.Promise = Promise;
mongoose
  .connect(config.db, { useNewUrlParser: true })
  .then(res => {
    console.log(`Connected to database '${res.connections[0].name}' on ${res.connections[0].host}:${res.connections[0].port}`);
  })
  .catch(err => {
    console.log('Connection Error: ', err);
  });


app.listen(PORT, function() {
  console.log(
    '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
    PORT,
    PORT
  );
});


