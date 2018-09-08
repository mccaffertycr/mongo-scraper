const cheerio = require('cheerio'),
      rp = require('request-promise'),
      db = require('../models');

module.exports = (app) => {
  app.get('/new', (req, res) => {

    rp('https://www.nytimes.com/section/us', (err, res, body) => {
      var $ = cheerio.load(body);

      $('#latest-panel article.story.theme-summary').each((i, element) => {
        let newArticle = new db.Article({
          link: $(element).find('.story-body>.story-link').attr('href'),
          headline: $(element).find('h2.headline').text().trim(),
          summary : $(element).find('p.summary').text().trim(),
          img_url  : $(element).find('img').attr('src'),
          byLine  : $(element).find('p.byline').text().trim()
        });

        if (newArticle.link && newArticle.headline) {
          db.Article.updateMany(
            newArticle,
            (err, doc) => {
              if (err) {
                console.log(err)
              } else {
                console.log(doc);
              }
            }
           );
        }
        
      });

    })
    .then(() => {
      res.send(true);
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
     );

  });

}