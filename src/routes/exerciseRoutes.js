const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.post(
    '/',
    exerciseController.createExercise
);

router.get(
    '/:id',
    exerciseController.getExercise
);

router.put(
    '/:id',
    exerciseController.updateExercise
);

router.delete(
    '/:id',
    exerciseController.deleteExercise
);

router.get(
    '/unit/:unitId',
    exerciseController.getExercisesByUnit
);

module.exports = router;
