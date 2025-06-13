const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/auth.middleware');
const juryScoreController = require('../controllers/jury_scoring.controller');

router.get('/ev-type', protectRoute(['jury']), juryScoreController.getEvaluationTypes);
router.get('/participants/:evaluationType', protectRoute(['jury']), juryScoreController.getParticipantsByEvaluationType);
router.post('/score', protectRoute(['jury']), juryScoreController.inputScore);
module.exports = router;
