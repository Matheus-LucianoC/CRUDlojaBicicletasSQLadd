const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Plano = sequelize.define('Plano', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  beneficios: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  horas_limite: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'planos',
  timestamps: false,
});

module.exports = Plano;