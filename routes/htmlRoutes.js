const db = require('../models');

module.exports = (app) => {
  app.get('/', (req, res) => {
    db.Article
      .find({})
      .then(articles => {
        res.render('index', {articles});
      })
      .catch(err => console.log(err));
  });
}