const navigationService = require('../services/navigationService');

async function enterRoute(req, res) {
  const { userId, route } = req.body;
  try {
    const entry = await navigationService.logEntry(userId, route);
    res.json({ entryId: entry._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function exitRoute(req, res) {
  const { entryId } = req.body;
  try {
    const updated = await navigationService.logExit(entryId);
    res.json({ entryId: updated._id, durationMs: updated.durationMs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { enterRoute, exitRoute };
