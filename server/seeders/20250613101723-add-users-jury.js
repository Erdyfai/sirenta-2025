'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    return queryInterface.bulkInsert('users', [
      {
        name: 'Jury One',
        nim: '202210370311001',
        angkatan: 2022,
        email: 'jury1@example.com',
        whatsapp: '081234567001',
        gender: 'L',
        role: 'jury',
        password: hashedPassword
      },
      {
        name: 'Jury Two',
        nim: '202210370311002',
        angkatan: 2022,
        email: 'jury2@example.com',
        whatsapp: '081234567002',
        gender: 'P',
        role: 'jury',
        password: hashedPassword
      },
      {
        name: 'Jury Three',
        nim: '202210370311003',
        angkatan: 2022,
        email: 'jury3@example.com',
        whatsapp: '081234567003',
        gender: 'L',
        role: 'jury',
        password: hashedPassword
      },
      {
        name: 'Jury Four',
        nim: '202210370311004',
        angkatan: 2022,
        email: 'jury4@example.com',
        whatsapp: '081234567004',
        gender: 'P',
        role: 'jury',
        password: hashedPassword
      },
      {
        name: 'Jury Five',
        nim: '202210370311005',
        angkatan: 2022,
        email: 'jury5@example.com',
        whatsapp: '081234567005',
        gender: 'L',
        role: 'jury',
        password: hashedPassword
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      nim: {
        [Sequelize.Op.in]: [
          '202210370311001',
          '202210370311002',
          '202210370311003',
          '202210370311004',
          '202210370311005'
        ]
      }
    }, {});
  }
};
