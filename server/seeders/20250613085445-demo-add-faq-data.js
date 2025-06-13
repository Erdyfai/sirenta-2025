'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('faq', [
      {
        pertanyaan: 'Min, semisal daftar jadi Asleb tapi ikut organisasi bagaimana?',
        answer: 'Aplikasi Diperbolehkan bagi semua mahasiswa dan tidak mengikuti organisasi itu bukan syarat wajib, jika teman-teman mengikuti organisasi teman-teman perlu pandai mengatur waktu antara kuliah, organisasi, dan kegiatan seleksi asisten lab baru.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pertanyaan: 'Min, kalo ga jago coding bagaimana?',
        answer: 'Jangan khawatir,bagi yang belum bisa coding! Kita bisa belajar bareng di sini! Selain itu, Asiten Lab juga memiliki tiga divisi yang bbisa disesuaikan dengan bakat dan kemampuan kalian, yakni divisi Acara, divisi MedSos, dan divisi Sistem Informasi.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pertanyaan: 'Min, boleh pake template CV sendiri gak?',
        answer: 'Dalam setiap tahapan dan open recruitment kali ini, peserta harus mengikuti template yang telah disiapkan. Template CV yang diterima dan wajib digunakan adalah CV dengan format yang sudah disediakan.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('faq', null, {});
  }
};
