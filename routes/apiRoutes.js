const cheerio = require('cheerio'),
      request = require('request'),
      db = require('../models');

module.exports = (app) => {
  app.get('/scrape', (req, res) => {
    request('https://www.nytimes.com/section/us', (err, res, body) => {
      var $ = cheerio.load(body);
      let newArticles = [];
      $('#latest-panel article.story.theme-summary').each((i, element) => {
        let newArticle = new db.Article({
          link: $(element).find('.story-body>.story-link').attr('href'),
          headline: $(element).find('h2.headline').text().trim(),
          summary : $(element).find('p.summary').text().trim(),
          img_url  : $(element).find('img').attr('src'),
          byLine  : $(element).find('p.byline').text().trim()
        });

        if (newArticle.link) {
          newArticles.push(newArticle);
        }
      });
      console.log(newArticles);
      db.Article
        .create(newArticles)
        .then(res => console.log(res))
        .catch(err => {});

    })
  });

}