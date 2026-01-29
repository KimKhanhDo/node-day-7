const express = require('express');

const router = express.Router();

const taskRoute = require('./task.route');
const authRoute = require('./auth.route');

router.use('/tasks', taskRoute);
router.use('/auth', authRoute);

module.exports = router;
