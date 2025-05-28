const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerRecordSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'Unit',
    required: true
  },
  exercise: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  correct: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model(
  'AnswerRecord',
  AnswerRecordSchema
);
