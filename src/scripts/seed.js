const mongoose = require('mongoose');
const fs = require('fs/promises');
const path = require('path');

const User = require('../models/user');
const Unit = require('../models/unit');
const Exercise = require('../models/exercise');
const AnswerRecord = require('../models/answerRecord');

async function loadJson(name) {
    const file = path.join(__dirname, 'seeds', `${name}.json`);
    const text = await fs.readFile(file, 'utf8');
    return JSON.parse(text);
}

async function seed() {
    await mongoose.connect('mongodb://127.0.0.1:27017/education-app');

    const [users, units, exercises, answers] = await Promise.all([
        loadJson('units'),
        loadJson('exercises')
    ]);

    await Promise.all([
        User.deleteMany({}),
        Unit.deleteMany({}),
        Exercise.deleteMany({}),
        AnswerRecord.deleteMany({})
    ]);

    await Promise.all([
        User.insertMany(users),
        Unit.insertMany(units),
        Exercise.insertMany(exercises),
        AnswerRecord.insertMany(answers)
    ]);

    console.log('Database seeded!');
    await mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
