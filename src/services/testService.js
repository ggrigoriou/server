const mongoose = require('mongoose');
const Exercise = require('../models/exercise');
const AnswerRecord = require('../models/answerRecord');
const UserProfile = require('../models/user');

const ObjectId = mongoose.Types.ObjectId;

async function recordAnswer({ userId, unitId, exerciseId, answer }) {
  const ex = await Exercise.findById(exerciseId).lean();
  if (!ex) throw new Error('Exercise not found');

  const correct = ex.correctAnswer === answer;

  const record = await AnswerRecord.create({
    user: new ObjectId(userId),
    unit: new ObjectId(unitId),
    exercise: new ObjectId(exerciseId),
    answer,
    correct
  });

  const wrongCount = await AnswerRecord.countDocuments({
    user: new ObjectId(userId),
    exercise: new ObjectId(exerciseId),
    correct: false
  });

  if (!correct && wrongCount >= 3) {
    await UserProfile.findOneAndUpdate(
      { user: new ObjectId(userId) },
      { $addToSet: { challengedModules: ex.topic } },
      { upsert: true }
    );
  }

  return {
    correct,
    wrongCount,
    correctAnswer: ex.correctAnswer
  };
}

async function startRepeatTest(userId) {
  const wrongDocs = await AnswerRecord.distinct('exercise', {
    user: new ObjectId(userId),
    correct: false
  });

  if (wrongDocs.length === 0) {
    return Exercise.aggregate([{ $sample: { size: 15 } }]);
  }

  const reinforce = wrongDocs.slice(0, 5);
  const freshCount = 15 - reinforce.length;
  const freshPool = await Exercise.aggregate([
    {
      $match: {
        _id: {
          $nin: reinforce.map(id => new ObjectId(id))
        }
      }
    },
    { $sample: { size: freshCount } }
  ]);

  const allIds = [...reinforce, ...freshPool.map(e => e._id)]
    .map(id => new ObjectId(id))
    .sort(() => Math.random() - 0.5);

  const docs = await Exercise.find({ _id: { $in: allIds } }).lean();
  return allIds.map(id => docs.find(d => d._id.equals(id)));
}

module.exports = {
  recordAnswer,
  startRepeatTest
};
