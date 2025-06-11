const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware.js');
const { profile, progress } = require('../controllers/participant.controller.js');

const router = express.Router();

const ROLE = "participant"; 

router.get('/profile', protectRoute([ROLE]), profile);
router.get('/progress', protectRoute([ROLE]), progress);

module.exports = router;