  const Sequelize = require('sequelize');
  module.exports = function(sequelize, DataTypes) {
    return sequelize.define('registrations', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'recruitment_sessions',
          key: 'id'
        }
      },
      cv_file_path: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      user_motivation: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      user_idea: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      submitted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      sequelize,
      tableName: 'registrations',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
        {
          name: "session_id",
          using: "BTREE",
          fields: [
            { name: "session_id" },
          ]
        },
      ]
    });
  };
