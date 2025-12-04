const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Produto = sequelize.define('Produto', {
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
    allowNull: false,
  },
  preco: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cor: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'produtos',
  timestamps: false,
});

module.exports = Produto;
