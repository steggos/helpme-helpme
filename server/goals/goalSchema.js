var mongoose = require('mongoose');
var PostSchema = require('../posts/postSchema.js')

var Schema = mongoose.Schema;

var GoalSchema = new Schema({
    goal: {
        type: String,
        required: true
    },
    due_date: {
        type: Date
    },
    posts: [PostSchema]
}, {
    timestamps: true
});

module.exports = GoalSchema;