const db = require('../models');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index');
  });
  
  app.get('/api/articles', (req, res) => {
    db.Article
      .find({})
      .then(articles => {
        res.json(articles);
      })
      .catch(err => res.json(err));
  });
  
  app.get('/saved', (req, res) => {
    db.Article
      .find({saved: true})
      .populate('notes')
      .then(articles => {
        res.render('saved', {articles});
      })
      .catch(err => console.log(err));
  });

}