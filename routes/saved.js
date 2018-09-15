const db = require('../models');

module.exports = (app) => {

  app.get('/saved', (req, res) => {
    db.Article
      .find({saved: true})
      .populate('notes')
      .then(articles => {
        res.render('saved', {articles});
      })
      .catch(err => console.log(err));
  });

  app.put('/saved', (req, res) => {
  
    let id = req.body.id;
    let isSaved = req.body.saved;
    db.Article.updateOne(
      { _id: id },
      { saved: isSaved },
      (err, doc) => {
        if (err) {
          console.log(err)
        } else {
          console.log(doc);
        }
      }
     )
     .then(() => {
       res.send(true);
     });
   
  });
  
  app.delete('/saved', (req, res) => {
  
    let id = req.body.id;
    db.Article.deleteOne({
      _id: id 
    }, (err) => {
      res.send(true);
      if (err) throw err
    });
  
  });

}