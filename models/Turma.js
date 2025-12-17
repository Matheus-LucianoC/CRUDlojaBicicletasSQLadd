const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Tutor = sequelize.define('Turma', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  alunos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tutor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aula: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Turmas',
  timestamps: false,
});

module.exports = Tutor;
