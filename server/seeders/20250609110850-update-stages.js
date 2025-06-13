'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const stageNames = ['Pendaftaran', 'Tahap 1', 'Tahap 2', 'Tahap 3'];

    for (let i = 0; i < stageNames.length; i++) {
      await queryInterface.sequelize.query(
        `UPDATE stages SET stage_order = ${i + 1} WHERE name = '${stageNames[i]}'`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `UPDATE stages SET stage_order = NULL`
    );
  }
};
