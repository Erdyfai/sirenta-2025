const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware.js');
const { fetchData, addData, deleteData, updateData } = require('../controllers/faq.controller.js');

const router = express.Router();


router.get('/fetch-data-faq', protectRoute(!['jury']), fetchData);
router.post('/add-data-faq', protectRoute(['admin']), addData);
router.delete('/delete-faq/:id', protectRoute(['admin']), deleteData);
router.put('/update-faq', protectRoute(['admin']), updateData);


module.exports = router;