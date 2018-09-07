const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const NoteSchema = new Schema({
  body: {
    type: String,
    required: true
  }
});


const Note = module.exports = mongoose.model('Note', NoteSchema);
