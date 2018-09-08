const db = require('../models');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/scrape', (req, res) => {
    db.Article
      .find({})
      .then(articles => {
        res.render('scrape', {articles});
      })
      .catch(err => console.log(err));
  });

  app.get('/saved', (req, res) => {
    db.Article
      .find({})
      .then(articles => {
        res.render('saved', {articles});
      })
      .catch(err => console.log(err));
  });
}