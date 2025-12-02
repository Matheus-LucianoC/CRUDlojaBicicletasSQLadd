const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Pessoa = sequelize.define('Pessoa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pessoa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'pessoas',
  timestamps: false,
});

module.exports = Pessoa;
