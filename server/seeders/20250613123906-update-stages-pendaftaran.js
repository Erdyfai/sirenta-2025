'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ambil ID sesi Rekrutmen 2025
    const sessions = await queryInterface.sequelize.query(
      `SELECT id FROM recruitment_sessions WHERE name = 'Rekrutmen 2025' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (sessions.length === 0) return;

    const sessionId = sessions[0].id;

    // Update stage Pendaftaran untuk Rekrutmen 2025 menjadi active
    await queryInterface.sequelize.query(
      `UPDATE stages
       SET status = 'completed'
       WHERE session_id = :sessionId AND stage_order=1;`,
      {
        replacements: { sessionId },
        type: Sequelize.QueryTypes.UPDATE,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    // Revert status menjadi inactive
    const sessions = await queryInterface.sequelize.query(
      `SELECT id FROM recruitment_sessions WHERE name = 'Rekrutmen 2025' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (sessions.length === 0) return;

    const sessionId = sessions[0].id;

    await queryInterface.sequelize.query(
      `UPDATE stages
       SET status = 'inactive'
       WHERE name = session_id = :sessionId AND stage_order = 1;`,
      {
        replacements: { sessionId },
        type: Sequelize.QueryTypes.UPDATE,
      }
    );
  }
};
