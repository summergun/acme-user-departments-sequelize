const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, { logging: false});

// const sequelize = new Sequelize('postgres://localhost/acme_users_and_departments', {
//   logging: false
// });

module.exports = db;