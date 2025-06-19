const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware.js');
const { getRecruitmentSessions, getUsersByStage, createRecruitmentSession, updateRecruitmentSession, updateUserProgress, updateStageStatus, resetParticipantStatus, getStageInfo, upsertStageInfo, updateRecruitmentSessionStatus } = require('../controllers/admin.controller.js');

const router = express.Router();

const ROLE = "admin"; 

router.get('/get/recruitment-sessions', protectRoute([ROLE]), getRecruitmentSessions);
router.get('/stage-users/:session_id/:stage_id', protectRoute([ROLE]), getUsersByStage);
router.get('/get/stages/:id/info', protectRoute(!['jury']), getStageInfo);

router.post('/create/recruitment-sessions', protectRoute([ROLE]), createRecruitmentSession);
router.post('/upsert/stages/:stageId/info', protectRoute([ROLE]), upsertStageInfo);

router.put('/update/recruitment-sessions/:sessionId', protectRoute([ROLE]), updateRecruitmentSession);
router.put('/update/stages/:id/status', protectRoute([ROLE]), updateStageStatus);
router.put('/update/user-progress/:id/reset-status', protectRoute([ROLE]), resetParticipantStatus);

router.patch('/update/user-progress/:user_id/:stage_id', protectRoute([ROLE]), updateUserProgress);
router.patch('/update/recruitment-sessions/:id/status', protectRoute([ROLE]), updateRecruitmentSessionStatus);
module.exports = router;