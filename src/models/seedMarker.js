const mongoose = require('mongoose');

const seedMarkerSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SeedMarker', seedMarkerSchema);