const fs = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');
const SeedMarker = require('../models/seedMarker');

function reviver(key, val) {
  if (val && val.$oid) return new mongoose.Types.ObjectId(val.$oid);
  if (val && val.$date) return new Date(val.$date);
  return val;
}

async function seedOnce() {
  if (await SeedMarker.findOne({ key: 'initial-load' })) {
    console.log('⏭ already seeded');
    return;
  }

  const seedsDir = path.join(__dirname, 'seeds');
  const files = await fs.readdir(seedsDir);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const raw = await fs.readFile(path.join(seedsDir, file), 'utf8');
    const docs = JSON.parse(raw, reviver);

    const base = path.basename(file, '.json');
    const modelName = base.endsWith('s') ? base.slice(0, -1) : base;
    const Model = require(`../models/${modelName}`);

    if (Array.isArray(docs) && docs.length) {
      await Model.insertMany(docs);
      console.log(`✔ seeded ${modelName}`);
    }
  }

  await SeedMarker.create({ key: 'initial-load' });
  console.log('✔ seed marker created');
}

module.exports = seedOnce;
