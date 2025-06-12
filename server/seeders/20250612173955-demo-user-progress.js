'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ambil hanya stage aktif
    const stages = await queryInterface.sequelize.query(
      `SELECT id, stage_order FROM stages WHERE status = 'active'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const users = [3, 4, 5, 6, 7];
    const progressData = [];

    for (const userId of users) {
      for (const stage of stages) {
        let status = 'pending';
        if (stage.stage_order === 1) status = 'passed';
        else if (stage.stage_order === 2) status = 'in_progress';

        progressData.push({
          user_id: userId,
          stage_id: stage.id,
          status,
        });
      }
    }

    await queryInterface.bulkInsert('user_progress', progressData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_progress', {
      user_id: [3, 4, 5, 6, 7]
    }, {});
  }
};
