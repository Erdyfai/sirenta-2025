const { users, stages, user_progress, recruitment_sessions, registrations } = require("../models");

  const profile = async (req, res) => {
    try {
      const userId = req.user.userId;
  
      const user = await users.findByPk(userId, {
        attributes: [
          'id',
          'name',
          'email',
          'nim',
          'angkatan',
          'whatsapp',
          'gender',
          'role',
        ],
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      return res.json({ user });
    } catch (error) {
      console.error('Error fetching profile:', error);
      return res.status(500).json({ message: "Internal Server error." });
    }
  };

  const progress = async (req, res) => {
    try {
      const userId = req.user.userId;
  
      // Ambil sesi rekrutmen aktif dan stages-nya
      const session = await recruitment_sessions.findOne({
        where: { is_active: true },
        include: [{
          model: stages,
          as: 'stages',
          order: [['stage_order', 'ASC']],
        }],
      });
  
      if (!session) {
        return res.status(404).json({ message: 'Tidak ada sesi rekrutmen aktif.' });
      }
  
      const stageIds = session.stages.map(stage => stage.id);
  
      // Ambil progres user di stages yang ada di sesi ini
      const progressList = await user_progress.findAll({
        where: {
          user_id: userId,
          stage_id: stageIds,
        },
      });
  
      // Gabungkan stage dan progress
      const result = session.stages.map(stage => {
        const progress = progressList.find(p => p.stage_id === stage.id);
        return {
          stage_id: stage.id,
          stage_name: stage.name,
          stage_order: stage.stage_order,
          status: progress ? progress.status : 'pending',
        };
      });
  
      return res.json({
        session_id: session.id,
        stages_progress: result,
      });
  
    } catch (error) {
      console.error('Error fetching progress:', error);
      return res.status(500).json({ message: 'Server error.' });
    }
  };
  

  const dashboardStatus = async (req, res) => {
    try {
      const userId = req.user.userId;

      const session = await recruitment_sessions.findOne({
        where: { is_active: true },
        include: [{
          model: stages,
          as: 'stages',
          order: [['stage_order', 'ASC']],
        }],
      });

      if (!session) {
        return res.json({ state: 'recruitmen closed', message: 'Tidak ada sesi rekrutmen yang sedang dibuka.' });
      }

      // 2. Ambil stage pendaftaran (misalnya berdasarkan nama atau order = 1)
      const registrationStage = session.stages.find(stage => stage.stage_order === 1);
      
      if (!registrationStage) {
        return res.status(500).json({ message: 'Stage pendaftaran tidak ditemukan.' });
      }

      // 3. Cek apakah waktu pendaftaran sudah lewat
      if (!registrationStage.status) {
        return res.json({ state: 'registration closed', message: 'Pendaftaran telah ditutup.' });
      }

      // 4. Cek apakah user sudah mendaftar
      const registered = await registrations.findOne({
        where: {
          user_id: userId,
          session_id: session.id,
        },
      });

      if (!registered) {
        return res.json({ state: 'registration', message: 'Pendaftaran dibuka.' });
      }

      // 5. Sudah mendaftar dan pendaftaran masih buka
      return res.json({ state: 'timeline', message: 'User Progress', session });
    } 
    catch (error) {
      console.error('Error checking dashboard status:', error);
      return res.status(500).json({ message: 'Server error.' });
    }
  };

  const registeredUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { user_motivation, user_idea, cv_file_path } = req.body;

    if (!user_motivation || !user_idea) {
      return res.status(400).json({ message: 'Motivasi dan ide wajib diisi.' });
    }

    const session = await recruitment_sessions.findOne({
      where: { is_active: true },
    });

    if (!session) {
      return res.status(400).json({ message: 'Tidak ada sesi rekrutmen aktif.' });
    }

    const existing = await registrations.findOne({
      where: {
        user_id: userId,
        session_id: session.id,
      },
    });

    if (existing) {
      return res.status(400).json({ message: 'Anda sudah mendaftar untuk sesi ini.' });
    }

    // Pakai cv_file_path dari body jika ada (untuk testing), jika tidak buat default
    const cvPath = cv_file_path || `/uploads/cv/${userId}.pdf`;

    const newRegistration = await registrations.create({
      user_id: userId,
      session_id: session.id,
      cv_file_path: cvPath,
      user_motivation,
      user_idea,
      submitted_at: new Date(),
    });

    return res.status(201).json({
      message: 'Pendaftaran berhasil.',
      data: newRegistration,
    });

  } catch (error) {
    console.error('Error saat mendaftar:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};



  module.exports = {profile, progress, dashboardStatus, registeredUser};

  