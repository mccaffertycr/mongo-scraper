const db = require('../models');

module.exports = (app) => {

  app.post('/note/:id', (req, res) => {
  
    let id = req.params.id;
    db.Note
      .create(req.body)
      .then(newNote => {
        db.Article
          .findOneAndUpdate({ _id: id }, { $push: { notes: newNote._id } }, { new: true })
          .then(() => res.json(newNote))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err)
    );
  
  });

}