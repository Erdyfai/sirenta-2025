// models/stage_judgers.js
module.exports = (sequelize, DataTypes) => {
    const StageJudgers = sequelize.define('stage_judgers', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'recruitment_sessions',
          key: 'id'
        }
      },
      stage: {
        type: DataTypes.ENUM('stage_1', 'stage_2', 'stage_3'),
        allowNull: false
      },
      evaluation_type: {
        type: DataTypes.ENUM('test', 'microteaching', 'interview', 'project_ue', 'project_jury'),
        allowNull: false
      },
      assigned_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'stage_judgers',
      timestamps: false
    });
  
    return StageJudgers;
  };
  