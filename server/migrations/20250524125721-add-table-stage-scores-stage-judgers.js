'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stage_scores', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      participant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      judger_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'recruitment_sessions',
          key: 'id'
        }
      },
      stage: {
        type: Sequelize.ENUM('stage_1', 'stage_2', 'stage_3'),
        allowNull: false
      },
      evaluation_type: {
        type: Sequelize.ENUM('test', 'microteaching', 'interview', 'project_ue', 'project_jury'),
        allowNull: false
      },
      score: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('stage_judgers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'recruitment_sessions',
          key: 'id'
        }
      },
      stage: {
        type: Sequelize.ENUM('stage_1', 'stage_2', 'stage_3'),
        allowNull: false
      },
      evaluation_type: {
        type: Sequelize.ENUM('test', 'microteaching', 'interview', 'project_ue', 'project_jury'),
        allowNull: false
      },
      assigned_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stage_scores');
    await queryInterface.dropTable('stage_judgers');
  }
};
