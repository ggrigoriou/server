const mongoose = require('mongoose');
const Exercise = require('../models/exercise');
const AnswerRecord = require('../models/answerRecord');
const User = require('../models/user');

const ObjectId = mongoose.Types.ObjectId;

async function computeMastery(userId, unitId) {
    const total = await Exercise.countDocuments({ unit: new ObjectId(unitId) });
    if (total === 0) return 0;
    const correctIds = await AnswerRecord.distinct('exercise', {
        user: new ObjectId(userId),
        unit: new ObjectId(unitId),
        correct: true
    });
    return Math.round((correctIds.length / total) * 100);
}

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

async function selectAdaptiveQuestions({ userId, unitId, numQuestions = 10 }) {
    const profile = await User.findOne({ user: new ObjectId(userId) }).lean();
    const masteryPct = await computeMastery(userId, unitId);

    const wrongIds = await AnswerRecord.distinct('exercise', {
        user: new ObjectId(userId),
        unit: new ObjectId(unitId),
        correct: false
    });

    const correctIds = await AnswerRecord.distinct('exercise', {
        user: new ObjectId(userId),
        unit: new ObjectId(unitId),
        correct: true
    });

    const excludeMastered = masteryPct >= 80 ? correctIds : [];

    const reinforceCount = Math.min(
        wrongIds.length,
        Math.ceil(numQuestions * 0.3)
    );
    const reinforceIds = wrongIds.slice(0, reinforceCount);

    let proportions;
    if (masteryPct < 50) {
        proportions = { easy: 0.6, medium: 0.3, hard: 0.1 };
    } else if (masteryPct < 80) {
        proportions = { easy: 0.2, medium: 0.6, hard: 0.2 };
    } else {
        proportions = { easy: 0.0, medium: 0.3, hard: 0.7 };
    }
    const freshCount = numQuestions - reinforceCount;
    const easyCount = Math.floor(freshCount * proportions.easy);
    const mediumCount = Math.floor(freshCount * proportions.medium);
    const hardCount = freshCount - easyCount - mediumCount;

    const baseMatch = {
        unit: new ObjectId(unitId),
        _id: {
            $nin: [
                ...excludeMastered,
                ...reinforceIds
            ].map(id => new ObjectId(id))
        }
    };

    const [easyPool, mediumPool, hardPool] = await Promise.all([
        easyCount > 0
            ? Exercise.aggregate([
                { $match: { ...baseMatch, difficulty: 'easy' } },
                { $sample: { size: easyCount } }
            ])
            : Promise.resolve([]),
        mediumCount > 0
            ? Exercise.aggregate([
                { $match: { ...baseMatch, difficulty: 'medium' } },
                { $sample: { size: mediumCount } }
            ])
            : Promise.resolve([]),
        hardCount > 0
            ? Exercise.aggregate([
                { $match: { ...baseMatch, difficulty: 'hard' } },
                { $sample: { size: hardCount } }
            ])
            : Promise.resolve([])
    ]);

    const freshPool = [...easyPool, ...mediumPool, ...hardPool];

    let allIds = [
        ...reinforceIds,
        ...freshPool.map(e => e._id)
    ].map(id => new ObjectId(id));

    const already = new Set(allIds.map(id => id.toString()));

    if (allIds.length < numQuestions) {
        const needed = numQuestions - allIds.length;

        const masteredCandidates = correctIds
        .map(id => new ObjectId(id))
        .filter(id => !already.has(id.toString()));

        const masteredToAdd = shuffleArray(masteredCandidates)
        .slice(0, needed);
        
        allIds = allIds.concat(masteredToAdd);
    }

    allIds = shuffleArray(allIds);

    const docs = await Exercise.find({
        _id: { $in: allIds }
    }).lean();

    let questions = allIds.map(id =>
        docs.find(d => d._id.toString() === id.toString())
    );

    if (profile?.visualLearner) {
        const desiredMedia = Math.ceil(numQuestions * 0.2);
        const haveMedia = questions.filter(q => q.mediaType !== 'text').length;
        const needMedia = Math.max(0, desiredMedia - haveMedia);

        if (needMedia > 0) {
            const existingIds = allIds;
            const mediaExtras = await Exercise.aggregate([
                {
                    $match: {
                        unit: new ObjectId(unitId),
                        mediaType: { $ne: 'text' },
                        _id: { $nin: existingIds }
                    }
                },
                { $sample: { size: needMedia } }
            ]);
            for (let i = 0; i < mediaExtras.length; i++) {
                questions[questions.length - 1 - i] = mediaExtras[i];
            }
        }
    }

    return questions;
}

module.exports = {
    selectAdaptiveQuestions
};
