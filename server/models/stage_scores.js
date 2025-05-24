// models/stage_scores.js
module.exports = (sequelize, DataTypes) => {
    const StageScores = sequelize.define('stage_scores', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      judger_id: {
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
      score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'stage_scores',
      timestamps: false
    });
  
    return StageScores;
  };
  