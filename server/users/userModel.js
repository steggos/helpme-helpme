var mongoose = require('mongoose');
var friends = require('mongoose-friends');
var goalSchema = require('../goals/goalSchema.js');

var userSchema = new mongoose.Schema({
  auth_id: {
    type: String,
    required: true
  },
  username: String,
  firstname: String,
  lastname: String,
  goals: [goalSchema],
},
{
  timestamps: true
});

UserSchema.plugin(friends({pathName: 'friends'}));
// this adds the following array to the schema:
// friends: [{
//   added: The date the friendship request was first *created* (NOT accepted)
//   status: pending/accepted/requested
//   _id: ID of friend
// }]

module.exports = mongoose.model('User', userSchema);
