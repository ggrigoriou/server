const Navigation = require('../models/navigation');

async function logEntry(userId, route) {
  return Navigation.create({ user: userId, route });
}

async function logExit(entryId) {
  const exitTime = new Date();
  const nav = await Navigation.findById(entryId);
  if (!nav) throw new Error('Navigation entry not found');
  nav.leftAt    = exitTime;
  nav.durationMs = exitTime - nav.enteredAt;
  return nav.save();
}

module.exports = { logEntry, logExit };
