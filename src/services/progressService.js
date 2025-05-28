const mongoose = require('mongoose');
const Unit = require('../models/unit');
const Exercise = require('../models/exercise');
const AnswerRecord = require('../models/answerRecord');
const User = require('../models/user');

const ObjectId = mongoose.Types.ObjectId;

async function computeForUser(userId) {
  const userObjId = new ObjectId(userId);
  const units = await Unit.find().lean();
  const results = [];

  for (const unit of units) {
    const unitObjId = new ObjectId(unit._id);
    const total = await Exercise.countDocuments({ unit: unitObjId });

    const correctIds = await AnswerRecord.distinct('exercise', {
      user: userObjId,
      unit: unitObjId,
      correct: true
    });
    const correctCount = correctIds.length;

    const mastery = total > 0
      ? Math.round((correctCount / total) * 100)
      : 0;

    results.push({
      unitName: unit.unitName,
      mastery
    });
  }

  const avgMastery = results.length
    ? results.reduce((sum, r) => sum + r.mastery, 0) / results.length
    : 0;

  let achievementLevel = 'basic';
  if (avgMastery >= 90) {
    achievementLevel = 'advanced';
  } else if (avgMastery >= 60) {
    achievementLevel = 'intermediate';
  }

  await User.findOneAndUpdate(
    userObjId,
    { achievementLevel },
    { new: true }
  );

  return results;
}

module.exports = {
  computeForUser
};