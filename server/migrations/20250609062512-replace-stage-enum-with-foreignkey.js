'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // === stage_scores ===
    await queryInterface.removeColumn('stage_scores', 'stage');
    await queryInterface.addColumn('stage_scores', 'stage_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'stages',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // === stage_judgers ===
    await queryInterface.removeColumn('stage_judgers', 'stage');
    await queryInterface.addColumn('stage_judgers', 'stage_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'stages',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // === stage_scores ===
    await queryInterface.removeColumn('stage_scores', 'stage_id');
    await queryInterface.addColumn('stage_scores', 'stage', {
      type: Sequelize.ENUM('stage_1', 'stage_2', 'stage_3'),
      allowNull: false
    });

    // === stage_judgers ===
    await queryInterface.removeColumn('stage_judgers', 'stage_id');
    await queryInterface.addColumn('stage_judgers', 'stage', {
      type: Sequelize.ENUM('stage_1', 'stage_2', 'stage_3'),
      allowNull: false
    });
  }
};
