var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true
  },
  goalTitle: String,
  goal_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{
    comment: String,
    commenter_id: {
      type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    firstname: String,
    lastname: String
  }]
},
{
  timestamps: true
});

module.exports = postSchema;
