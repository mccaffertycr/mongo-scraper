const cheerio = require('cheerio');
const rp = require('request-promise');
const db = require('../models');

module.exports = (app) => {

  app.get('/new', (req, res) => {
    // find articles already saved in database and create an array of their headlines
    db.Article
      .find({})
      .then((articles) => {
        let articleHeadlines = articles.map(article => article.headline);

        rp('https://www.nytimes.com/section/us', (error, result, body) => {
          var $ = cheerio.load(body);
          let newArticles = [];
          $('#latest-panel article.story.theme-summary').each((i, element) => {

            let newArticle = new db.Article({
              link: $(element).find('.story-body>.story-link').attr('href'),
              headline: $(element).find('h2.headline').text().trim(),
              headline_stub: $(element).find('h2.headline').text().trim().split(' ')[0],
              summary : $(element).find('p.summary').text().trim(),
              img_url  : $(element).find('img').attr('src'),
              byLine  : $(element).find('p.byline').text().trim()
            });
          
            // ensure the article wasn't already entered into the database by checking against the array of saved headlines
            if (newArticle.link && !articleHeadlines.includes(newArticle.headline)) {
              newArticles.push(newArticle);
            }

          }); 
        
          // enter the array of new articles into the database
          db.Article
            .create(newArticles)
            .then((docs) => {
              // res.json({count: docs.length});
              console.log(docs);
            })
            .catch(err => console.log(err));

        })
        .then(() => {
          res.send(true);
        })
        .catch(err => console.log(err));
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
    }, (err, doc) => { 
      console.log(doc);
      if (err) throw err
    });

  });

  app.post('/note/:id', (req, res) => {

    let id = req.params.id;
    db.Note
      .create(req.body)
      .then(newNote => {
        db.Article
          .findOneAndUpdate({ _id: id }, { $push: { notes: newNote._id } }, { new: true })
          .then(updatedArticle => res.json(updatedArticle))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err)
    );

  });

}