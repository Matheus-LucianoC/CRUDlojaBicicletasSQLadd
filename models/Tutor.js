const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Tutor = sequelize.define('Tutor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  diciplina: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'tutores',
  timestamps: false,
});

module.exports = Tutor;
