const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Aula = sequelize.define('Aula', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  faixa_etaria: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  horas_semanais: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'aulas',
  timestamps: false,
});

module.exports = Aula;