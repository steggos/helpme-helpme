var Guide = require('./guideSchema');

module.exports = {
  getAll: function(cb) {
    Guide.find()
    .exec(cb);
  },
  getCategories: function(category, cb) {
    Guide.find()
    .where('category').in([category])
    .limit(3)
    .exec(cb);
  }
};