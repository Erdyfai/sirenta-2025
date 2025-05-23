'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin UMM',
        nim: '202310370311071',
        angkatan: 2023,
        email: 'admin@umm.ac.id',
        whatsapp: '081234567890',
        gender: 'L',
        role: 'admin',
        password: hashedPassword,
      },
      {
        name: 'Juri Informatika',
        nim: '202310370311238',
        angkatan: 2023,
        email: 'jury@umm.ac.id',
        whatsapp: '081234567891',
        gender: 'P',
        role: 'jury',
        password: hashedPassword,
      },
      {
        name: 'Peserta 1',
        nim: '202310370311240',
        angkatan: 2023,
        email: 'participant1@umm.ac.id',
        whatsapp: '081234567892',
        gender: 'L',
        role: 'participant',
        password: hashedPassword,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@umm.ac.id', 'jury@umm.ac.id', 'participant1@umm.ac.id']
    }, {});
  }
};
