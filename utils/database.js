const { Sequelize } = require('sequelize');

//Create a connection to database
const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '20896087',
  database: 'semana1',
  port: '5433',
  logging: false,
});

module.exports = { db };
