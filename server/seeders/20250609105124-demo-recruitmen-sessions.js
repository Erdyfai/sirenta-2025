'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recruitment_sessions', [
      {
        name: 'Rekrutmen 2023',
        description: 'Sesi perekrutan asisten laboratorium tahun 2023',
        is_active: false,
        started_at: new Date('2023-01-01'),
        ended_at: new Date('2023-07-31'),
      },
      {
        name: 'Rekrutmen 2024',
        description: 'Sesi perekrutan asisten laboratorium tahun 2024',
        is_active: false,
        started_at: new Date('2024-01-01'),
        ended_at: new Date('2024-07-31'),
      },
      {
        name: 'Rekrutmen 2025',
        description: 'Sesi perekrutan asisten laboratorium tahun 2025',
        is_active: true,
        started_at: new Date('2025-01-01'),
        ended_at: new Date('2025-07-31'),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recruitment_sessions', {
      name: ['Rekrutmen 2023', 'Rekrutmen 2024', 'Rekrutmen 2025']
    }, {});
  }
};
