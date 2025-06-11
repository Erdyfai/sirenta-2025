'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Andi Wijaya',
        nim: '202310370311101',
        angkatan: 2023,
        email: 'andi@umm.ac.id',
        whatsapp: '081234567001',
        gender: 'L',
        role: 'participant',
        password: hashedPassword,
      },
      {
        name: 'Budi Santoso',
        nim: '202310370311102',
        angkatan: 2023,
        email: 'budi@umm.ac.id',
        whatsapp: '081234567002',
        gender: 'L',
        role: 'participant',
        password: hashedPassword,
      },
      {
        name: 'Citra Lestari',
        nim: '202310370311103',
        angkatan: 2023,
        email: 'citra@umm.ac.id',
        whatsapp: '081234567003',
        gender: 'P',
        role: 'participant',
        password: hashedPassword,
      },
      {
        name: 'Deni Prasetyo',
        nim: '202310370311104',
        angkatan: 2023,
        email: 'deni@umm.ac.id',
        whatsapp: '081234567004',
        gender: 'L',
        role: 'participant',
        password: hashedPassword,
      },
      {
        name: 'Eka Putri',
        nim: '202310370311105',
        angkatan: 2023,
        email: 'eka@umm.ac.id',
        whatsapp: '081234567005',
        gender: 'P',
        role: 'participant',
        password: hashedPassword,
      },
      {
        name: 'Fajar Nugroho',
        nim: '202310370311106',
        angkatan: 2023,
        email: 'fajar@umm.ac.id',
        whatsapp: '081234567006',
        gender: 'L',
        role: 'participant',
        password: hashedPassword,
      },
      {
        name: 'Gita Permata',
        nim: '202310370311107',
        angkatan: 2023,
        email: 'gita@umm.ac.id',
        whatsapp: '081234567007',
        gender: 'P',
        role: 'participant',
        password: hashedPassword,
      },
      {
        name: 'Hendra Saputra',
        nim: '202310370311108',
        angkatan: 2023,
        email: 'hendra@umm.ac.id',
        whatsapp: '081234567008',
        gender: 'L',
        role: 'participant',
        password: hashedPassword,
      },
      {
        name: 'Indah Ramadhani',
        nim: '202310370311109',
        angkatan: 2023,
        email: 'indah@umm.ac.id',
        whatsapp: '081234567009',
        gender: 'P',
        role: 'participant',
        password: hashedPassword,
      },
      {
        name: 'Joko Supriadi',
        nim: '202310370311110',
        angkatan: 2023,
        email: 'joko@umm.ac.id',
        whatsapp: '081234567010',
        gender: 'L',
        role: 'participant',
        password: hashedPassword,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: [
        'andi@umm.ac.id',
        'budi@umm.ac.id',
        'citra@umm.ac.id',
        'deni@umm.ac.id',
        'eka@umm.ac.id',
        'fajar@umm.ac.id',
        'gita@umm.ac.id',
        'hendra@umm.ac.id',
        'indah@umm.ac.id',
        'joko@umm.ac.id'
      ]
    }, {});
  }
};
