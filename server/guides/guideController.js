var Guide = require('./guideSchema');

module.exports = {
  getAll: function(req, res) {
    Guide.find()
    .then(function(guides) {
      res.status(200).json(guides);
    });
  },
  getByCategory: function(req, res) {
    Guide.find()
    .where('category').in([req.params.category])
    .limit(3)
    .then(function(guides) {
      res.status(200).json(guides)
    });
  }
};
