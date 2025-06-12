'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('stages', 'status', {
      type: Sequelize.ENUM('active', 'inactive', 'completed'),
      allowNull: false,
      defaultValue: 'inactive'
    });
    
    await queryInterface.addColumn('stages', 'end_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('stages', 'end_date');
    await queryInterface.removeColumn('stages', 'status');

    // Hapus ENUM jika perlu agar tidak tersisa di DB
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_stages_status";');
  }
};
