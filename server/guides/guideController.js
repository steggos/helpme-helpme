var Guide = require('./guideSchema');
var _ = require('lodash');

module.exports = {
  getAll: function (req, res) {
    Guide.find()
    .then(function (guides) {
      res.status(200).json(guides);
    });
  },

  getByCategory: function (req, res) {
    Guide.find()
    .where('category').in([req.params.category])
    .limit(3)
    .then(function (guides) {
      res.status(200).json(guides);
    });
  },

  getCategories: function (req, res) {
    Guide.find()
    .then(function (guides) {
      var categories = [];
      guides.forEach(function (guide) {
        categories = _.union(categories, guide.category);
      });

      res.status(200).json(categories);
    });
  },
};
