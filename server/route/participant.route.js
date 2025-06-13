const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware.js');
const { profile, progress, dashboardStatus, registeredUser } = require('../controllers/participant.controller.js');

const router = express.Router();

const ROLE = "participant"; 

router.get('/profile', protectRoute([ROLE]), profile);
router.get('/progress', protectRoute(), progress);
router.get('/dashboard-status', protectRoute([ROLE]), dashboardStatus);
router.post('/registered', protectRoute([ROLE]), registeredUser);

module.exports = router;