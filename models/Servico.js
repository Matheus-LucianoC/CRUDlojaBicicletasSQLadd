const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Servico = sequelize.define('Servico', {
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
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preco: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'servicos',
  timestamps: false,
});

module.exports = Servico;
