const { DataTypes } = require('sequelize');
const sequelize = require('../database')

const servicos = sequelize.define('servicos', {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNul: false
    },
    nome:{
        type: DataTypes.STRING,
        allowNul: false
    },
    descricao:{
        type: DataTypes.STRING,
        allowNul: false
    },
    preco:{
        type: DataTypes.INTEGER,
        allowNul: false
    }
});

module.exports = servicos