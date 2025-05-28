const express = require("express");

const router = express.Router();

const userRoutes = require('./src/routes/userRoutes');
const unitRoutes = require('./src/routes/unitRoutes');
const exerciseRoutes = require('./src/routes/exerciseRoutes');
const userProgressRoutes = require('./src/routes/progressRoutes');
const authRoutes = require('./src/routes/authRoutes');
const testRoutes = require('./src/routes/testRoutes');
const navigationRoutes = require('./src/routes/navigationRoutes');
const questionTrackingRoutes = require('./src/routes/questionTrackingRoutes')

router
    .use(
        '/test',
        testRoutes
    )
    .use(
        '/users',
        userRoutes
    )
    .use(
        '/units',
        unitRoutes
    )
    .use(
        '/exercises',
        exerciseRoutes
    )
    .use(
        '/progress',
        userProgressRoutes
    )
    .use(
        '/auth',
        authRoutes
    )
    .use(
        '/progrss',
        userProgressRoutes
    )
    .use(
        '/navigation',
        navigationRoutes
    )
    .use(
        '/question',
        questionTrackingRoutes
    );

module.exports = router;
