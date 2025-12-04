const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Evento = sequelize.define('evento', {
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
  requisitos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  faixa_etaria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'eventos',
  timestamps: false,
});

module.exports = Evento;
