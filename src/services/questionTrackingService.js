const QuestionTracking = require('../models/questionTracking');

async function logEnter(userId, questionId) {
    const entry = await QuestionTracking.create({ user: userId, question: questionId });
    return entry._id;
}

async function logExit(entryId) {
    const now = new Date();
    const entry = await QuestionTracking.findById(entryId);
    if (!entry) throw new Error('QuestionTracking entry not found');
    entry.leftAt = now;
    entry.durationMs = now - entry.enteredAt;
    await entry.save();
    return entry.durationMs;
}

module.exports = { logEnter, logExit };
