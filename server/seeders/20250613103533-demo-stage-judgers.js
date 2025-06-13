'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ambil 5 user dengan role "jury"
    const [juryUsers] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = 'jury' ORDER BY id ASC LIMIT 5;`
    );

    // Ambil session yang aktif
    const [[session]] = await queryInterface.sequelize.query(
      `SELECT id FROM recruitment_sessions WHERE is_active = 1 ORDER BY id ASC LIMIT 1;`
    );

    // Ambil semua stage yang active dan punya stage_order sesuai kebutuhan
    const [stages] = await queryInterface.sequelize.query(
      `SELECT id, stage_order FROM stages WHERE status = 'active'`
    );

    // Mapping stage_order ke ID-nya
    const stageMap = {};
    for (const stage of stages) {
      stageMap[stage.stage_order] = stage.id;
    }

    // Validasi data cukup
    if (juryUsers.length < 5 || !session || Object.keys(stageMap).length < 3) {
      throw new Error('Seeder gagal: Tidak cukup data user, session, atau stage sesuai stage_order!');
    }

    const evaluationMap = [
      { type: 'test', stage_order: 2 },
      { type: 'microteaching', stage_order: 3 },
      { type: 'interview', stage_order: 3 },
      { type: 'project_ue', stage_order: 4 },
      { type: 'project_jury', stage_order: 4 },
    ];

    const data = juryUsers.map((user, index) => {
      const { type, stage_order } = evaluationMap[index];
      return {
        user_id: user.id,
        session_id: session.id,
        stage_id: stageMap[stage_order],
        evaluation_type: type,
        assigned_at: new Date()
      };
    });

    return queryInterface.bulkInsert('stage_judgers', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stage_judgers', null, {});
  }
};
