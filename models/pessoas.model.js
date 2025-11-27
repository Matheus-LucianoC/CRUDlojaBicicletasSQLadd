const { DataTypes } = require('sequelize');
const sequelize = require('../database')

const pessoas = sequelize.define('pessoas', {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNul: false
    },
    pessoa:{
        type: DataTypes.STRING,
        allowNul: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNul: false
    },
    idade:{
        type: DataTypes.INTEGER,
        allowNul: false
    }
});

module.exports = pessoas