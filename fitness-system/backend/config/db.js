const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'fitness_db'
});
module.exports = pool;

mongoose.connect(process.env.MONGO_URI);