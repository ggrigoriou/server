const express = require('express');
const router = express.Router();
const userProgressController = require('../controllers/userProgressController');

router.post(
    '/',
    userProgressController.createUserProgress
);

router.get(
    '/:id',
    userProgressController.getUserProgress
);

router.put(
    '/:id',
    userProgressController.updateUserProgress
);

router.delete(
    '/:id',
    userProgressController.deleteUserProgress
);

router.get(
    '/',
    userProgressController.getUserProgressByUserAndUnit
);

module.exports = router;