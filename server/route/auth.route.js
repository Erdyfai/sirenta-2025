const express = require('express');
const { login, logout } = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
