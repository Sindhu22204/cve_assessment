// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // For loading environment variables from .env file

// Creating a new Sequelize instance for database connection
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'mysql',
  logging: false, // Set to true to see SQL queries in the console
});
// Test connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;