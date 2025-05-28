const progressService = require('../services/progressService');

async function getUserProgress(req, res) {
  try {
    const data = await progressService.computeForUser(req.params.userId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getUserProgress
};
