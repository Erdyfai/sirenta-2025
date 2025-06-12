const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware.js');
const { profile, progress, dashboardStatus } = require('../controllers/participant.controller.js');

const router = express.Router();

const ROLE = "participant"; 

router.get('/profile', protectRoute([ROLE]), profile);
router.get('/progress', protectRoute([ROLE]), progress);
router.get('/dashboard-status', protectRoute([ROLE]), dashboardStatus);

module.exports = router;