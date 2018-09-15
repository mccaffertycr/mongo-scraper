const cheerio = require('cheerio');
const rp = require('request-promise');
const db = require('../models');

module.exports = (app) => {

  app.get('/scrape', (req, res) => {

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
            if (newArticle.link && newArticle.img_url && !articleHeadlines.includes(newArticle.headline)) {
              newArticles.push(newArticle);
            }

          }); 
        
          // enter the array of new articles into the database
          db.Article
            .create(newArticles)
            .then(docs => {
              if (newArticles && docs) {
                res.render('scrape', {articles: docs});
              } else {
                res.render('scrape', {articles});
              }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  
  });

  app.delete('/scrape', (req, res) => {
    db.Article
      .deleteMany({
        saved: false
      }, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result);
        }
      }).then(() => res.send(true));
  });

  app.get('/api/articles', (req, res) => {
    db.Article
      .find({})
      .then(articles => {
        res.json(articles);
      })
      .catch(err => res.json(err));
  });

}