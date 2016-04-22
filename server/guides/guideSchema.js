var mongoose = require('mongoose');

var guideSchema = new mongoose.Schema({
  name: String,
  category: [String],
  file: String,
  icon: String
});

var Guide = mongoose.model('guide', guideSchema);

module.exports = Guide;
