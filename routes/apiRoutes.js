const cheerio = require('cheerio'),
      request = require('request'),
      db = require('../models');

module.exports = (app) => {
  app.get('/scrape', (req, res) => {

    request('https://www.nytimes.com/section/us', (err, res, body) => {
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
          db.Article.update(
            newArticle,
            { upsert: true },
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


    });

    // reload page with new articles
    res.redirect('/');
  });

  app.put('/saved', (req, res) => {
    let id = req.body.id;
    let isSaved = req.body.saved;
    db.Article.update(
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

  })

}