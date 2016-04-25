var mongoose = require('mongoose');

var guideSchema = new mongoose.Schema({
  name: String,
  author: String,
  category: [String],
  file: String,
  icon: String,
  description: String,
});

module.exports = mongoose.model('guide', guideSchema);
