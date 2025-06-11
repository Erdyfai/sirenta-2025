'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const sessions = await queryInterface.sequelize.query(
      `SELECT id, name FROM recruitment_sessions WHERE name IN ('Rekrutmen 2023', 'Rekrutmen 2024', 'Rekrutmen 2025');`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const stageNames = ['Pendaftaran', 'Tahap 1', 'Tahap 2', 'Tahap 3'];
    const stages = [];

    const now = new Date();

    sessions.forEach(session => {
      stageNames.forEach((name, index) => {
        stages.push({
          session_id: session.id,
          name,
          description: `Stage ${name} untuk ${session.name}`,
          created_at: now,
          updated_at: now,
        });
      });
    });

    await queryInterface.bulkInsert('stages', stages, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stages', {
      name: ['Pendaftaran', 'Tahap 1', 'Tahap 2', 'Tahap 3']
    }, {});
  }
};
