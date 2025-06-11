const { users, stages, user_progress, recruitment_sessions } = require("../models");

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

  };

const dashboardStatus = async (req, res) => {
    try {
      const userId = req.user.userId;

      const session = await recruitment_sessions.findOne({
        where: { is_active: true },
        include: [{
          model: stages,
          as: 'stages',
          order: [['order', 'ASC']],
        }],
      });

      if (!session) {
        return res.json({ state: 'recruitmen closed', message: 'Tidak ada sesi rekrutmen yang sedang dibuka.' });
      }

      // 2. Ambil stage pendaftaran (misalnya berdasarkan nama atau order = 1)
      const registrationStage = session.stages.find(stage => stage.name.toLowerCase() === 'pendaftaran');

      if (!registrationStage) {
        return res.status(500).json({ message: 'Stage pendaftaran tidak ditemukan.' });
      }

      // 3. Cek apakah waktu pendaftaran sudah lewat
      const now = new Date();
      const registrationClosed = registrationStage.closed_at && now > new Date(registrationStage.closed_at);

      if (registrationClosed) {
        return res.json({ state: 'registration closed', message: 'Pendaftaran telah ditutup.' });
      }

      // 4. Cek apakah user sudah mendaftar
      const existingProgress = await user_progress.findOne({
        where: {
          user_id: userId,
          stage_id: registrationStage.id,
        },
      });

      if (!existingProgress) {
        return res.json({ state: 'D', message: 'Pendaftaran dibuka. Anda belum mendaftar.' });
      }

      // 5. Sudah mendaftar dan pendaftaran masih buka
      return res.json({ state: 'B', message: 'Anda telah mendaftar. Ini timeline seleksi.', session });
    } catch (error) {
      console.error('Error checking dashboard status:', error);
      return res.status(500).json({ message: 'Server error.' });
    }
  };

  module.exports = {profile, progress};

  