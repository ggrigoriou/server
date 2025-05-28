const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.get(
    '/user/:userId',
    progressController.getUserProgress
);

module.exports = router;
