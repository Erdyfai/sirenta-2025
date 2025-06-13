'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('faq', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    pertanyaan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'faq',
    timestamps: true
  });
};
