const { Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./data/database.sqlite",
    logging: false
})

