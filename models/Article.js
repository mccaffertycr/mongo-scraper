const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  headline: {
    type: String,
    unique: true,
    required: true
  },
  headline_stub: String,
  link: {
    type: String, 
    required: true
  },
  img_url: String,
  summary: String,
  byline: String,
  saved: {
    type: Boolean,
    default: false
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});


const Article = module.exports = mongoose.model('Article', ArticleSchema);
