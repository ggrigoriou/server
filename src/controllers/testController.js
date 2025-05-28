const testService = require('../services/testService');
const adaptiveService = require('../services/adaptiveService');

async function startTest(req, res) {
  const { unitId, userId } = req.params;
  try {
    const questions = await adaptiveService.selectAdaptiveQuestions({
      userId,
      unitId,
      numQuestions: 10
    });
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function submitAnswer(req, res) {
  try {
    const { userId, unitId, exerciseId, answer } = req.body;
    const result = await testService.recordAnswer({
      userId,
      unitId,
      exerciseId,
      answer
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function startRepeatTest(req, res) {
  const { userId } = req.params;
  try {
    const questions = await testService.startRepeatTest(userId);
    res.json({ questions });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  startTest,
  submitAnswer,
  startRepeatTest
};
