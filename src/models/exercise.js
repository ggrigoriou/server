const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'Unit',
    required: true
  },
  exerciseType: {
    type: String,
    enum: ['multiple-choice', 'short-answer'],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum:['easy','medium','hard'],
    default:'medium', 
    index:true 
  },
  mediaType:   { 
    type: String, 
    enum:['text','image','video'], 
    default:'text' 
  },
  mediaUrl:   { 
    type: String, 
    trim: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  'Exercise',
  ExerciseSchema
);