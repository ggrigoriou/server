const express = require('express');
const { enterRoute, exitRoute } = require('../controllers/navigationController');
const router = express.Router();

router.post('/enter', enterRoute);
router.post('/exit',  exitRoute);

module.exports = router;
