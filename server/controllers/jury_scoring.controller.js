const { users, registrations, stage_scores, stage_judgers, stages, recruitment_sessions } = require('../models');
const { Op } = require('sequelize');

const getEvaluationTypes = async (req, res) => {
  try {
    const juryId = req.user.userId;

    const data = await stage_judgers.findAll({
      where: { user_id: juryId },
      attributes: ['evaluation_type', 'stage_id', 'session_id'],
      include: [
        {
          model: stages,
          as: 'stage',
          attributes: ['name', 'status', 'stage_order'],
        },
        {
          model: recruitment_sessions,
          as: 'session',
          attributes: ['name', 'is_active'],
        },
      ],
      raw: true,
      nest: true,
    });

    res.status(200).json({
      message: 'Evaluation assignments fetched successfully.',
      data,
    });
  } catch (error) {
    console.error('Error fetching evaluation assignments:', error);
    res.status(500).json({
      message: 'Failed to fetch evaluation assignments.',
      error: error.message,
    });
  }
};

const getParticipantsByEvaluationType = async (req, res) => {
  try {
    const jurorId = req.user.userId;
    const evaluationType = req.params.evaluationType;

    // 1. Ambil stage_judger aktif berdasarkan juri & evaluation_type
    const assignment = await stage_judgers.findOne({
      where: {
        user_id: jurorId,
        evaluation_type: evaluationType,
      },
      include: [
        {
          model: stages,
          as: 'stage',
          where: { status: 'active' },
          required: true,
        },
        {
          model: recruitment_sessions,
          as: 'session',
          where: { is_active: true },
          required: true,
        },
      ],
    });

    if (!assignment) {
      return res.status(403).json({
        message: 'Anda tidak memiliki tugas untuk tipe evaluasi ini atau tidak ada sesi/stage aktif.',
      });
    }

    // 2. Ambil semua peserta dari session aktif, termasuk data user dan nilai dari juri ini
    const participants = await registrations.findAll({
      where: { session_id: assignment.session_id },
      include: [
        {
          model: users,
          as: 'user',
          attributes: ['id', 'name', 'nim'],
          include: [
            {
              model: stage_scores,
              as: 'stage_scores',
              where: {
                stage_id: assignment.stage_id,
                judger_id: jurorId,
              },
              required: false,
            },
          ],
        },
      ],
    });

    // 3. Susun hasil akhir
    const result = participants.map((reg) => {
      const score = reg.user?.stage_scores?.[0]; // karena hanya satu nilai dari juri untuk peserta ini

      return {
        registration_id: reg.id,
        user_id: reg.user?.id,
        name: reg.user?.name,
        nim: reg.user?.nim,
        has_scored: !!score,
        score_id: score?.id || null,
        score_value: score?.score || null, // misalnya ada kolom score
        notes: score?.notes || null, // jika ada kolom komentar/catatan
      };
    });

    return res.status(200).json({
      stage_id: assignment.stage_id,
      evaluation_type: evaluationType,
      participants: result,
    });
  } catch (error) {
    console.error('Error fetching participants:', error);
    return res.status(500).json({
      message: 'Server error.',
      error: error.message,
    });
  }
};

const inputScore = async (req, res) => {
  try {
    const jurorId = req.user.userId;
    const { participant_id, evaluation_type, score, notes } = req.body;

    const assignment = await stage_judgers.findOne({
      where: {
        user_id: jurorId,
        evaluation_type,
      },
    });

    if (!assignment) {
      return res.status(403).json({
        message: 'Anda tidak memiliki hak untuk menilai evaluation type ini.',
      });
    }

    const targetReg = await registrations.findOne({
      where: {
        session_id: assignment.session_id,
        user_id: participant_id,
      },
    });

    if (!targetReg) {
      return res.status(404).json({
        message: 'Peserta tidak ditemukan dalam sesi rekrutmen ini.',
      });
    }

    const existingScore = await stage_scores.findOne({
      where: {
        participant_id,
        stage_id: assignment.stage_id,
        judger_id: jurorId,
      },
    });

    let result;
    if (existingScore) {
      // Update nilai
      existingScore.score = score;
      existingScore.notes = notes;
      await existingScore.save();
      result = existingScore;
    } else {
      // Simpan nilai baru
      result = await stage_scores.create({
        participant_id,
        judger_id: jurorId,
        session_id: assignment.session_id,
        stage_id: assignment.stage_id,
        evaluation_type,
        score,
        notes,
      });
    }

    return res.status(200).json({
      message: existingScore ? 'Nilai berhasil diperbarui.' : 'Nilai berhasil disimpan.',
      data: result,
    });
  } catch (error) {
    console.error('Error input nilai:', error);
    return res.status(500).json({
      message: 'Gagal menyimpan nilai.',
      error: error.message,
    });
  }
};

module.exports = {
  getParticipantsByEvaluationType,
  getEvaluationTypes,
  inputScore,
  // Add other controller methods here as needed
};
