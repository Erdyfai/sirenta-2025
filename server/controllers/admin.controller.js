// controllers/admin.controller.js
const { users, 
        user_progress, 
        stages, 
        stage_scores, 
        registrations, 
        recruitment_sessions, 
        stage_infos 
      } = require('../models');

const { Sequelize, Op } = require('sequelize');

const getRecruitmentSessions = async (req, res) => {
  try {
    const sessions = await recruitment_sessions.findAll({
      include: [
        {
          model: stages,
          as: 'stages',
          order: [['stage_order', 'DESC']],
        },
      ],
      order: [['id', 'DESC']],
    });

    const registrationsCount = await registrations.findAll({
      attributes: [
        'session_id',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'registrations_count'],
      ],
      group: ['session_id'],
      raw: true,
    });

    const countMap = {};
    registrationsCount.forEach(row => {
      countMap[row.session_id] = parseInt(row.registrations_count);
    });

    const result = sessions.map(session => {
      return {
        ...session.toJSON(),
        registrations_count: countMap[session.id] || 0,
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Error in recruitmentSessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getUsersByStage = async (req, res) => {
    const { session_id, stage_id } = req.params;
  
    try {
      const stage = await stages.findOne({ where: { id: stage_id, session_id } });
      if (!stage) return res.status(404).json({ error: 'Stage not found in the session' });
      
      console.log(session_id);
      const userProgressList = await user_progress.findAll({
        where: { stage_id, status: { [Op.notIn]: ['pending', 'failed'] } },
        include: [
          {
            model: users,
            as: 'user',
            attributes: ['id', 'name', 'email'],
            include: [
              {
                model: registrations,
                as: 'registrations',
                where: { session_id },
                attributes: ['cv_file_path', 'user_motivation', 'user_idea'],
                required: false
              },
              {
                model: stage_scores,
                as: 'stage_scores', 
                where: { stage_id, session_id },
                required: false,
                attributes: ['judger_id', 'evaluation_type', 'score', 'notes']
              }
            ]
          }
        ]
      });
  
      // Format response
      const result = userProgressList.map(entry => {
        const user = entry.user;
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            cv_file_path: user.registrations?.[0]?.cv_file_path || null,
            user_motivation: user.registrations?.[0]?.user_motivation || null,
            user_idea: user.registrations?.[0]?.user_idea || null,
            scores: user.stage_scores || [],
            status: entry.status
        };
      });
  
      res.json({
        stage_name: stage.name,
        stage_status: stage.status,
        data: result
      });
    } catch (error) {
      console.error('Error in getUsersByStage:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const createRecruitmentSession = async (req, res) => {
    
    try {
      
      const { name, description, started_at, ended_at, tahapan } = req.body;
  
      if (!Array.isArray(tahapan)) {
        return res.status(400).json({ message: 'Field "tahapan" harus berupa array.' });
      }
  
      const session = await recruitment_sessions.create({
        name: name,
        description: description,
        start_at: started_at,
        ended_at: ended_at,
      });
  
      const stage = tahapan.map((tahap, index) => ({
        session_id: session.id,
        name: tahap.name,
        status: tahap.status,
        description: tahap.description,
        stage_order: index + 1
      }));
  
      await stages.bulkCreate(stage);
  
      res.status(201).json({ message: 'Sesi dan tahapan berhasil dibuat', session, stage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal membuat sesi rekrutmen', error: error.message });
    }
  };

  const updateRecruitmentSession = async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const { name, description, started_at, ended_at, tahapan } = req.body;
  
      await recruitment_sessions.update(
        { name, description, started_at, ended_at },
        { where: { id: sessionId } }
      );
  
      const existingStages = await stages.findAll({ where: { session_id: sessionId } });
  
      const existingMap = new Map(existingStages.map(stage => [stage.id, stage]));
  

      const incomingIds = new Set();
  
      for (const [index, tahap] of tahapan.entries()) {
        if (tahap.id && existingMap.has(tahap.id)) {
          await stages.update(
            {
              name: tahap.name,
              description: tahap.description,
              status: tahap.status,
              stage_order: index + 1
            },
            { where: { id: tahap.id } }
          );
          incomingIds.add(tahap.id);
        } else {
          await stages.create({
            session_id: sessionId,
            name: tahap.name,
            description: tahap.description,
            status: tahap.status,
            stage_order: index + 1
          });
        }
      }
  
      for (const stage of existingStages) {
        if (!incomingIds.has(stage.id)) {
          await stages.destroy({ where: { id: stage.id } });
        }
      }
  
      const updatedSession = await recruitment_sessions.findOne({
        where: { id: sessionId },
        include: [{ model: stages, as: 'stages' }]
      });
      
      res.status(200).json({
        message: 'Sesi dan tahapan berhasil diperbarui',
        updatedSession
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal memperbarui sesi rekrutmen', error: error.message });
    }
  };
  

const updateUserProgress = async (req, res) => {
  const { user_id, stage_id } = req.params;
  const { status } = req.body;

  try {
    // Ambil stage yang sedang diupdate
    const currentStage = await stages.findOne({ where: { id: stage_id } });
    if (!currentStage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    // Update status saat ini
    const updated = await user_progress.update(
      { status },
      {
        where: { user_id, stage_id },
      }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: 'User progress not found or not updated' });
    }

    // Ambil stage order dari stage sekarang
    const currentOrder = currentStage.stage_order;

    if (status === 'passed') {
      // Jika lulus, ubah status tahap berikutnya jadi in_progress
      const nextStage = await stages.findOne({
        where: {
          session_id: currentStage.session_id,
          stage_order: currentOrder + 1,
        },
      });

      if (nextStage) {
        await user_progress.update(
          { status: 'in_progress' },
          {
            where: {
              user_id,
              stage_id: nextStage.id,
            },
          }
        );
      }
    } else if (status === 'failed') {
      // Jika gagal, ubah semua tahap setelahnya jadi pending
      const nextStages = await stages.findAll({
        where: {
          session_id: currentStage.session_id,
          stage_order: { [Op.gt]: currentOrder },
        },
      });

      const nextStageIds = nextStages.map((s) => s.id);

      if (nextStageIds.length > 0) {
        await user_progress.update(
          { status: 'pending' },
          {
            where: {
              user_id,
              stage_id: nextStageIds,
            },
          }
        );
      }
    }

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating user_progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


  const updateStageStatus = async (req, res) => {
    const stageId = req.params.id;
    const { status } = req.body;
  
    try {
      const validStatuses = ['completed', 'inactive', 'active'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
  
      await stages.update({ status }, { where: { id: stageId } });
  
      res.json({ message: 'Stage status updated successfully', status });
    } catch (error) {
      console.error('Error updating stage status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  const resetParticipantStatus = async (req, res) => {
    const stageId = req.params.id;
  
    try {
      // Ambil data stage saat ini
      const currentStage = await stages.findOne({ where: { id: stageId } });
      if (!currentStage) {
        return res.status(404).json({ message: 'Stage not found' });
      }
  
      const currentOrder = currentStage.stage_order;
      const sessionId = currentStage.session_id;
  
      // Reset status current stage ke in_progress
      await user_progress.update(
        { status: 'in_progress' },
        { where: { stage_id: stageId } }
      );
  
      // Ambil semua stage selanjutnya
      const nextStages = await stages.findAll({
        where: {
          session_id: sessionId,
          stage_order: { [Op.gt]: currentOrder },
        },
      });
  
      const nextStageIds = nextStages.map(stage => stage.id);
  
      if (nextStageIds.length > 0) {
        // Set semua peserta di stage berikutnya menjadi pending
        await user_progress.update(
          { status: 'pending' },
          { where: { stage_id: nextStageIds } }
        );
      }
  
      res.json({ message: 'Status peserta berhasil di-reset' });
    } catch (error) {
      console.error('Error resetting participant status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

const getStageInfo = async (req, res) => {
  const stageId = req.params.id;

  try {
    const infos = await stage_infos.findAll({
      where: { stage_id: stageId },
      attributes: ['status', 'content']
    });

    if (!infos || infos.length === 0) {
      return res.status(200).json({
        message: 'Stage info belum tersedia, silakan isi terlebih dahulu',
        data: {}
      });
    }

    const formatted = {};
    infos.forEach(info => {
      formatted[info.status] = info.content;
    });

    res.json({ data: formatted });
  } catch (error) {
    console.error('Error fetching stage info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const upsertStageInfo = async (req, res) => {
  const stageId = req.params.stageId;
  const { contents } = req.body;

  if (!Array.isArray(contents)) {
    return res.status(400).json({ error: 'Format data salah. Harus berupa array of contents.' });
  }

  try {
    for (const { status, content } of contents) {
      if (!status) continue; // Lewatkan jika status kosong

      const existing = await stage_infos.findOne({
        where: { stage_id: stageId, status }
      });

      if (existing) {
        await existing.update({ content: String(content) });
      } else {
        await stage_infos.create({
          stage_id: stageId,
          status,
          content: String(content)
        });
      }
    }

    res.json({ message: 'Informasi tahap berhasil disimpan.', type: 'bulk_upsert' });
  } catch (err) {
    console.error('Error creating/updating stage info:', err);
    res.status(500).json({ error: 'Gagal menyimpan informasi tahap' });
  }
};

const updateRecruitmentSessionStatus = async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;

  try {
    if (is_active) {
      // Nonaktifkan semua sesi lain
      await recruitment_sessions.update({ is_active: false }, { where: {} });
    }

    // Update status sesi ini
    await recruitment_sessions.update(
      { is_active },
      { where: { id } }
    );

    res.json({ message: 'Status sesi diperbarui' });
  } catch (err) {
    console.error('Gagal update status sesi:', err);
    res.status(500).json({ message: 'Gagal update status sesi' });
  }
};





module.exports = {
  getRecruitmentSessions,
  getUsersByStage,
  createRecruitmentSession,
  updateRecruitmentSession,
  updateUserProgress,
  updateStageStatus,
  resetParticipantStatus,
  getStageInfo,
  upsertStageInfo,
  updateRecruitmentSessionStatus
};
