'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('stages', 'order', 'stage_order');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('stages', 'stage_order', 'order');
  }
};
