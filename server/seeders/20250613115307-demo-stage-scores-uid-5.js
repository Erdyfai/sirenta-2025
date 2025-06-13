'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('stage_scores', [
      {
        participant_id: 5,          // user_id peserta
        judger_id: 2,              // ganti dengan ID juri yang relevan
        session_id: 7,             // ganti dengan session yang aktif
        evaluation_type: 'test', // sesuai dengan stage yang juri handle
        score: 85.50,
        notes: 'GOOD.',
        stage_id: 10                // ganti dengan ID stage untuk microteaching
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('stage_scores', {
      participant_id: 5,
      judger_id: 2,
      evaluation_type: 'test'
    }, {});
  }
};
