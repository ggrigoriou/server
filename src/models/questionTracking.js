const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionTrackingSchema = new Schema({
  user: {
    type:     Schema.Types.ObjectId,
    ref:      'User',
    required: true,
    index:    true
  },
  question: {
    type:     Schema.Types.ObjectId,
    ref:      'Exercise',
    required: true,
    index:    true
  },
  enteredAt: {
    type:    Date,
    default: Date.now,
    index:   true
  },
  leftAt:    Date,
  durationMs: Number
});

module.exports = mongoose.model(
    'QuestionTracking', 
    QuestionTrackingSchema
);
