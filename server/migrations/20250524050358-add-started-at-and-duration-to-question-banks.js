'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('question_banks', 'started_at', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.addColumn('question_banks', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('question_banks', 'started_at');
    await queryInterface.removeColumn('question_banks', 'duration');
  }
};
