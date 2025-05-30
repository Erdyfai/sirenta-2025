const express = require('express');
const {login, logout, checkAuth} = require('../controllers/auth.controller.js');
const {protectRoute} = require('../middleware/auth.middleware.js');


const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);

router.get('/check', protectRoute(), checkAuth); 
 

module.exports = router;
