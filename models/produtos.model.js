const { DataTypes } = require('sequelize');
const sequelize = require('../database')

const produtos = sequelize.define('produtos', {
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
    },
    cor:{
        type: DataTypes.STRING,
        allowNul: false
    }
});

module.exports = produtos