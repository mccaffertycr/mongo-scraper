var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String, 
    required: true
  },
  summary: {
    type: String
  },
  byline: {
    type: String
  },
  saved: {
    type: Boolean,
    default: false
  },
  note: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
});

var Article = mongoose.model('Article', ArticleSchema);


module.exports = Article;