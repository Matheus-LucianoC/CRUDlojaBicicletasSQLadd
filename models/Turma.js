const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { NOMEM } = require('sqlite3');

const Tutor = sequelize.define('Turma', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Turmas',
  timestamps: false,
});

module.exports = Tutor;
