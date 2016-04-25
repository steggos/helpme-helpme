var mongoose = require('mongoose');
var postSchema = require('../posts/postSchema.js');

var goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: String,
  icon: String,
  due_date: { type: Date },
  posts: [postSchema],
},
{
  timestamps: true,
});

module.exports = goalSchema;
