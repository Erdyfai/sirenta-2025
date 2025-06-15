const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stage_infos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'stages',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('pending','in_progress','passed','failed'),
      allowNull: false,
      defaultValue: 'pending'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stage_infos',
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
        name: "stage_id",
        unique: false,
        using: "BTREE",
        fields: [
          { name: "stage_id" },
          { name: "status" },
        ]
      },
    ]
  });
};
