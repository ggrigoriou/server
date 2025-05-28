const qtService = require('../services/questionTrackingService');

async function enterQuestion(req, res) {
  try {
    const { userId, questionId } = req.body;
    const entryId = await qtService.logEnter(userId, questionId);
    res.json({ entryId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function exitQuestion(req, res) {
  try {
    const { entryId } = req.body;
    const durationMs = await qtService.logExit(entryId);
    res.json({ entryId, durationMs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { enterQuestion, exitQuestion };
