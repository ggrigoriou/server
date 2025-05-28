const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get(
    '/start/:unitId/:userId',
    testController.startTest
);

router.post(
    '/answer',
    testController.submitAnswer
);

router.get(
    '/repeat/:userId',
    testController.startRepeatTest
);

module.exports = router;

