const express = require('express');
const { enterQuestion, exitQuestion } = require('../controllers/questionTrackingController');
const router = express.Router();

router.post('/enter', enterQuestion);
router.post('/exit',  exitQuestion);

module.exports = router;
