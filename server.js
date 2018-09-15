require('dotenv').config();
const express = require('express');
const env = process.env.NODE_ENV || 'development';
const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');


// for bodyparser & morgan
app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// for handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// routes
require('./routes/index')(app);
require('./routes/scrape')(app);
require('./routes/saved')(app);
require('./routes/note')(app);

// database connection
const config = require('./config/db');

mongoose.Promise = Promise;
mongoose
  .connect(config.db, { useNewUrlParser: true })
  .then(res => {
    console.log(`Connected to database '${res.connections[0].name}' on ${res.connections[0].host}:${res.connections[0].port}`);
  })
  .catch(err => {
    console.log('Database Connection Error: ', err);
  });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


// start server 
app.listen(PORT, () => {
  console.log(
    '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
    PORT,
    PORT
  );
});


