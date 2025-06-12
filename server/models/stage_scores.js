const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'stage_scores',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      judger_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'recruitment_sessions',
          key: 'id',
        },
      },
      evaluation_type: {
        type: DataTypes.ENUM('test', 'microteaching', 'interview', 'project_ue', 'project_jury'),
        allowNull: false,
      },
      score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'stages',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'stage_scores',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'participant_id',
          using: 'BTREE',
          fields: [{ name: 'participant_id' }],
        },
        {
          name: 'judger_id',
          using: 'BTREE',
          fields: [{ name: 'judger_id' }],
        },
        {
          name: 'session_id',
          using: 'BTREE',
          fields: [{ name: 'session_id' }],
        },
        {
          name: 'stage_scores_stage_id_foreign_idx',
          using: 'BTREE',
          fields: [{ name: 'stage_id' }],
        },
      ],
    }
  );
};
