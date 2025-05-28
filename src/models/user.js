const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  visualLearner: { 
    type: Boolean, 
    default: false 
  },
  challengedModules: [
    String
  ],
  achievementLevel:  { 
    type: String, 
    enum: ['basic','intermediate','advanced'], 
    default: 'basic' 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  'User',
  UserSchema
);
