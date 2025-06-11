'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ambil ID sesi 2025
    const [sessionRows] = await queryInterface.sequelize.query(
      `SELECT id FROM recruitment_sessions WHERE name = 'Rekrutmen 2025' LIMIT 1`
    );

    const sessionId = sessionRows[0]?.id;
    if (!sessionId) throw new Error('Session Rekrutmen 2025 not found');

    // Ambil 5 user participant pertama
    const [userRows] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = 'participant' ORDER BY id ASC LIMIT 5`
    );

    const registrations = userRows.map(user => ({
      user_id: user.id,
      session_id: sessionId,
      cv_file_path: `/uploads/cv/${user.id}.pdf`,
      user_motivation: 'Saya ingin berkontribusi di lab informatika.',
      user_idea: 'Saya ingin membuat platform pembelajaran interaktif.',
      submitted_at: new Date()
    }));

    await queryInterface.bulkInsert('registrations', registrations, {});
  },

  async down(queryInterface, Sequelize) {
    // Hapus hanya 5 user participant yang tadi dimasukkan
    await queryInterface.sequelize.query(`
      DELETE FROM registrations 
      WHERE user_id IN (
        SELECT id FROM (
          SELECT id FROM users WHERE role = 'participant' ORDER BY id ASC LIMIT 5
        ) AS sub
      )
    `);
  }
};
