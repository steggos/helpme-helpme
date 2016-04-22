var mongoose = require('mongoose');
var PostSchema = require('../posts/postSchema.js');

var Schema = mongoose.Schema;

var GoalSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: String,
  due_date: { type: Date },
  posts: [PostSchema]
},
{
  timestamps: true
});

module.exports = GoalSchema;